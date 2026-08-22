/** Document root <html> element. */
export const html: HTMLElement = document.documentElement

/** Document <body> element. */
export const body: HTMLElement = document.body

/** Creates an HTML anchor element. */
export const a = (): HTMLAnchorElement => document.createElement('a')

/** Creates an HTML article element. */
export const article = (): HTMLElement => document.createElement('article')

/** Creates an HTML aside element. */
export const aside = (): HTMLElement => document.createElement('aside')

/** Creates an HTML audio element. */
export const audio = (): HTMLAudioElement => document.createElement('audio')

/** Creates an HTML button element. */
export const button = (): HTMLButtonElement => document.createElement('button')

/** Creates an HTML canvas element. */
export const canvas = (): HTMLCanvasElement => document.createElement('canvas')

/** Creates an HTML code element. */
export const code = (): HTMLElement => document.createElement('code')

/** Creates an HTML div element. */
export const div = (): HTMLDivElement => document.createElement('div')

/** Creates an HTML footer element. */
export const footer = (): HTMLElement => document.createElement('footer')

/** Creates an HTML form element. */
export const form = (): HTMLFormElement => document.createElement('form')

/** Creates an HTML level-one heading element. */
export const h1 = (): HTMLHeadingElement => document.createElement('h1')

/** Creates an HTML level-two heading element. */
export const h2 = (): HTMLHeadingElement => document.createElement('h2')

/** Creates an HTML level-three heading element. */
export const h3 = (): HTMLHeadingElement => document.createElement('h3')

/** Creates an HTML level-four heading element. */
export const h4 = (): HTMLHeadingElement => document.createElement('h4')

/** Creates an HTML level-five heading element. */
export const h5 = (): HTMLHeadingElement => document.createElement('h5')

/** Creates an HTML level-six heading element. */
export const h6 = (): HTMLHeadingElement => document.createElement('h6')

/** Creates an HTML header element. */
export const header = (): HTMLElement => document.createElement('header')

/** Creates an HTML horizontal rule element. */
export const hr = (): HTMLHRElement => document.createElement('hr')

/** Creates an HTML inline frame element. */
export const iframe = (): HTMLIFrameElement => document.createElement('iframe')

/** Creates an HTML image element. */
export const img = (): HTMLImageElement => document.createElement('img')

/** Creates an HTML input element. */
export const input = (): HTMLInputElement => document.createElement('input')

/** Creates an HTML label element. */
export const label = (): HTMLLabelElement => document.createElement('label')

/** Creates an HTML list item element. */
export const li = (): HTMLLIElement => document.createElement('li')

/** Creates an HTML main element. */
export const main = (): HTMLElement => document.createElement('main')

/** Creates an HTML navigation element. */
export const nav = (): HTMLElement => document.createElement('nav')

/** Creates an HTML ordered list element. */
export const ol = (): HTMLOListElement => document.createElement('ol')

/** Creates an HTML option element. */
export const option = (): HTMLOptionElement => document.createElement('option')

/** Creates an HTML paragraph element. */
export const p = (): HTMLParagraphElement => document.createElement('p')

/** Creates an HTML preformatted text element. */
export const pre = (): HTMLPreElement => document.createElement('pre')

/** Creates an HTML section element. */
export const section = (): HTMLElement => document.createElement('section')

/** Creates an HTML select element. */
export const select = (): HTMLSelectElement => document.createElement('select')

/** Creates an HTML small text element. */
export const small = (): HTMLElement => document.createElement('small')

/** Creates an HTML span element. */
export const span = (): HTMLSpanElement => document.createElement('span')

/** Creates an HTML strong importance element. */
export const strong = (): HTMLElement => document.createElement('strong')

/** Creates an HTML table element. */
export const table = (): HTMLTableElement => document.createElement('table')

/** Creates an HTML table body element. */
export const tbody = (): HTMLTableSectionElement =>
  document.createElement('tbody')

/** Creates an HTML table data cell element. */
export const td = (): HTMLTableCellElement => document.createElement('td')

/** Creates an HTML text area element. */
export const textarea = (): HTMLTextAreaElement =>
  document.createElement('textarea')

/** Creates an HTML table footer element. */
export const tfoot = (): HTMLTableSectionElement =>
  document.createElement('tfoot')

/** Creates an HTML table header cell element. */
export const th = (): HTMLTableCellElement => document.createElement('th')

/** Creates an HTML table head element. */
export const thead = (): HTMLTableSectionElement =>
  document.createElement('thead')

/** Creates an HTML table row element. */
export const tr = (): HTMLTableRowElement => document.createElement('tr')

/** Creates an HTML unordered list element. */
export const ul = (): HTMLUListElement => document.createElement('ul')

/** Creates an HTML video element. */
export const video = (): HTMLVideoElement => document.createElement('video')
