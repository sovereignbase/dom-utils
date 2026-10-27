import { expect, test } from '@bgotink/playwright-coverage'
import type * as DOM from '../../../dist/index.js'

declare global {
  interface Window {
    dom: typeof DOM
    clickCount: number
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(async () => {
    const moduleURL = '/dist/index.js'
    window.dom = await import(moduleURL)
  })
})

test('exports document roots and creates fresh native elements for every tag', async ({
  page,
}) => {
  const result = await page.evaluate(() => {
    const tags = [
      'a',
      'article',
      'aside',
      'audio',
      'button',
      'canvas',
      'code',
      'div',
      'footer',
      'form',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'header',
      'hr',
      'iframe',
      'img',
      'input',
      'label',
      'li',
      'main',
      'nav',
      'ol',
      'option',
      'p',
      'pre',
      'section',
      'select',
      'small',
      'span',
      'strong',
      'table',
      'tbody',
      'td',
      'textarea',
      'tfoot',
      'th',
      'thead',
      'tr',
      'ul',
      'video',
    ] as const
    return {
      html: window.dom.html === document.documentElement,
      body: window.dom.body === document.body,
      exportsMatch:
        Object.keys(window.dom).sort().join(',') ===
        [...tags, 'html', 'body', 'readableUserAgent'].sort().join(','),
      failures: tags.flatMap((tag) => {
        const node = window.dom[tag]()
        const other = window.dom[tag]()
        const native = document.createElement(tag)
        return node.localName === tag &&
          node.constructor === native.constructor &&
          node.ownerDocument === document &&
          !node.isConnected &&
          node !== other &&
          node.childNodes.length === 0 &&
          node.attributes.length === 0
          ? []
          : [tag]
      }),
    }
  })
  expect(result).toEqual({
    html: true,
    body: true,
    exportsMatch: true,
    failures: [],
  })
})

test('keeps document root references captured at import time', async ({
  page,
}) => {
  const result = await page.evaluate(() => {
    const original = document.body
    const replacement = document.createElement('body')
    document.documentElement.replaceChild(replacement, original)
    return {
      original: window.dom.body === original,
      replacement: window.dom.body === document.body,
      html: window.dom.html === document.documentElement,
    }
  })
  expect(result).toEqual({ original: true, replacement: false, html: true })
})

test('composes native elements with inline styles and independent event handlers', async ({
  page,
}) => {
  await page.evaluate(() => {
    const { body, div, button, p } = window.dom
    const panel = div()
    panel.style.cssText = 'display: flex; gap: 12px; color: rgb(12, 34, 56);'
    const counter = p()
    counter.textContent = 'Count: 0'
    const increment = button()
    increment.textContent = 'Increment'
    window.clickCount = 0
    increment.addEventListener('click', () => {
      counter.textContent = `Count: ${++window.clickCount}`
    })
    const reset = button()
    reset.textContent = 'Reset'
    reset.onclick = () => {
      window.clickCount = 0
      counter.textContent = 'Count: 0'
    }
    panel.append(counter, increment, reset)
    body.append(panel)
  })
  await page.getByRole('button', { name: 'Increment' }).click()
  await page.getByRole('button', { name: 'Increment' }).click()
  await expect(page.getByText('Count: 2')).toBeVisible()
  await expect(page.locator('body > div')).toHaveCSS('display', 'flex')
  await expect(page.locator('body > div')).toHaveCSS('gap', '12px')
  await expect(page.locator('body > div')).toHaveCSS('color', 'rgb(12, 34, 56)')
  await page.getByRole('button', { name: 'Reset' }).click()
  await expect(page.getByText('Count: 0')).toBeVisible()
})

test('supports native form controls, labels, selection and submission', async ({
  page,
}) => {
  await page.evaluate(() => {
    const { body, form, input, label, select, option, textarea, button, p } =
      window.dom
    const editor = form()
    const nameLabel = label()
    nameLabel.htmlFor = 'name'
    nameLabel.textContent = 'Name'
    const name = input()
    name.id = 'name'
    name.name = 'name'
    name.required = true
    const language = select()
    language.name = 'language'
    language.setAttribute('aria-label', 'Language')
    for (const code of ['fi', 'en']) {
      const choice = option()
      choice.value = code
      choice.textContent = code
      language.append(choice)
    }
    const notes = textarea()
    notes.name = 'notes'
    notes.setAttribute('aria-label', 'Notes')
    const submit = button()
    submit.type = 'submit'
    submit.textContent = 'Save'
    const result = p()
    result.setAttribute('role', 'status')
    editor.onsubmit = (event) => {
      event.preventDefault()
      result.textContent = JSON.stringify(
        Object.fromEntries(new FormData(editor))
      )
    }
    editor.append(nameLabel, name, language, notes, submit)
    body.append(editor, result)
  })
  await page.getByLabel('Name').fill('Ada')
  await page.getByLabel('Language').selectOption('en')
  await page.getByLabel('Notes').fill('Native DOM ✓')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByRole('status')).toHaveText(
    JSON.stringify({ name: 'Ada', language: 'en', notes: 'Native DOM ✓' })
  )
})

test('supports semantic table and list composition and ordinary DOM mutations', async ({
  page,
}) => {
  const result = await page.evaluate(() => {
    const { body, table, thead, tbody, tfoot, tr, th, td, ul, li } = window.dom
    const grid = table()
    const head = thead()
    const heading = tr()
    const title = th()
    title.scope = 'col'
    title.textContent = 'Item'
    heading.append(title)
    head.append(heading)
    const rows = tbody()
    const row = tr()
    const cell = td()
    cell.textContent = 'First'
    row.append(cell)
    rows.append(row)
    const foot = tfoot()
    grid.append(head, rows, foot)
    const list = ul()
    const first = li()
    first.textContent = 'First'
    const second = li()
    second.textContent = 'Second'
    list.append(second)
    list.prepend(first)
    first.remove()
    list.replaceChildren(second, first)
    body.append(grid, list)
    return {
      tableRows: grid.rows.length,
      cell: grid.tBodies[0].rows[0].cells[0].textContent,
      header: grid.tHead?.rows[0].cells[0].scope,
      footer: grid.tFoot === foot,
      list: [...list.children].map((node) => node.textContent),
      identity: list.lastElementChild === first,
    }
  })
  expect(result).toEqual({
    tableRows: 2,
    cell: 'First',
    header: 'col',
    footer: true,
    list: ['Second', 'First'],
    identity: true,
  })
})
