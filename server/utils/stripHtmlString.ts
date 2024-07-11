import stripHtml from 'string-strip-html'

/**
 * Strip html from string using [string-strip-html](https://www.npmjs.com/package/string-strip-html)
 *
 * @remarks Used when fetching events from Microsoft Graph
 * or Google Calendar
 *
 * @param str - String
 */
export function stripHtmlString(string = ''): string {
  if(!string) return string
  return stripHtml(string).result
}

