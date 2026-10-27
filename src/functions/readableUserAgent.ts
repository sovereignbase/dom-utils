import Bowser from 'bowser'

/**
 * Returns browser, device model, OS, and platform names separated by ` · `.
 * Reads the current navigator user agent and optional Client Hints on each call,
 * omitting missing values.
 */
export function readableUserAgent(): string {
  const { userAgentData } = navigator as Navigator & {
    userAgentData?: Bowser.ClientHints
  }
  const { browser, os, platform } = Bowser.parse(
    navigator.userAgent,
    userAgentData
  )

  return [browser.name, platform.model, os.name, platform.type]
    .filter(Boolean)
    .join(' · ')
}
