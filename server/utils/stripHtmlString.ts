import stringStripHtml from 'string-strip-html'

/**
 * Strip html from string using string-strip-html
 * Used when fetching events from ms graph
 * Strips the html from event body
 *
 * @param str - String
 */
export function stripHtmlString(str: string): string {
  return stringStripHtml(str).result
}