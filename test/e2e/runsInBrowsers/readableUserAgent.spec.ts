import { expect, test } from '@bgotink/playwright-coverage'
import type * as DOM from '../../../dist/index.js'

const chrome =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
const firefox =
  'Mozilla/5.0 (X11; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0'
const iphone =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

for (const [name, userAgent, expected] of [
  ['Chrome desktop', chrome, 'Chrome · Windows · desktop'],
  ['Firefox desktop', firefox, 'Firefox · Linux · desktop'],
  ['Safari iPhone', iphone, 'Safari · iPhone · iOS · mobile'],
  ['unknown client', 'UnknownClient/1.0', ''],
] as const) {
  test(`formats ${name} without Client Hints`, async ({ page }) => {
    const result = await page.evaluate(async (ua) => {
      Object.defineProperty(navigator, 'userAgent', {
        configurable: true,
        value: ua,
      })
      Object.defineProperty(navigator, 'userAgentData', {
        configurable: true,
        value: undefined,
      })
      const moduleURL = '/dist/index.js'
      const { readableUserAgent } = (await import(moduleURL)) as typeof DOM
      return readableUserAgent()
    }, userAgent)
    expect(result).toBe(expected)
  })
}

test('uses Client Hints for browser identification', async ({ page }) => {
  const result = await page.evaluate(async (ua) => {
    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value: ua,
    })
    Object.defineProperty(navigator, 'userAgentData', {
      configurable: true,
      value: {
        brands: [
          { brand: 'Chromium', version: '130' },
          { brand: 'Brave', version: '130' },
        ],
        platform: 'Windows',
        mobile: false,
      },
    })
    const moduleURL = '/dist/index.js'
    const { readableUserAgent } = (await import(moduleURL)) as typeof DOM
    return readableUserAgent()
  }, chrome)
  expect(result).toBe('Brave · Windows · desktop')
})

test('handles empty Client Hints without losing the user-agent description', async ({
  page,
}) => {
  const result = await page.evaluate(async (ua) => {
    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value: ua,
    })
    Object.defineProperty(navigator, 'userAgentData', {
      configurable: true,
      value: {},
    })
    const moduleURL = '/dist/index.js'
    const { readableUserAgent } = (await import(moduleURL)) as typeof DOM
    return readableUserAgent()
  }, chrome)
  expect(result).toBe('Chrome · Windows · desktop')
})

test('reads the current navigator on each call', async ({ page }) => {
  const result = await page.evaluate(
    async ([first, second]) => {
      Object.defineProperty(navigator, 'userAgentData', {
        configurable: true,
        value: undefined,
      })
      const moduleURL = '/dist/index.js'
      const { readableUserAgent } = (await import(moduleURL)) as typeof DOM
      Object.defineProperty(navigator, 'userAgent', {
        configurable: true,
        value: first,
      })
      const before = readableUserAgent()
      Object.defineProperty(navigator, 'userAgent', {
        configurable: true,
        value: second,
      })
      return [before, readableUserAgent()]
    },
    [chrome, iphone]
  )
  expect(result).toEqual([
    'Chrome · Windows · desktop',
    'Safari · iPhone · iOS · mobile',
  ])
})

test('describes the real browser without a global Bowser dependency', async ({
  page,
  browserName,
}) => {
  const result = await page.evaluate(async () => {
    const moduleURL = '/dist/index.js'
    const { readableUserAgent } = (await import(moduleURL)) as typeof DOM
    return {
      description: readableUserAgent(),
      globalBowser: 'Bowser' in window,
    }
  })
  const name = { chromium: 'Chrome', firefox: 'Firefox', webkit: 'Safari' }[
    browserName
  ]
  expect(result.description).toMatch(new RegExp(`^${name} · `))
  expect(result.description).not.toMatch(/undefined|null/)
  expect(result.globalBowser).toBe(false)
})
