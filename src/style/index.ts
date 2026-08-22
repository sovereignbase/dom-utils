/** Raw CSS template tag for editor and formatter CSS language support. */
export const css = String.raw

/**
 * Applies inline CSS declarations to an HTML element.
 *
 * Replaces the element's existing inline style with `cssText`.
 *
 * @param element HTML element to style.
 * @param cssText CSS declarations to apply.
 */
export function style<T extends HTMLElement>(
  element: T,
  cssText: string
): void {
  element.style.cssText = cssText
}
