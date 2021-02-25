import stringStripHtml from 'string-strip-html'

/**
 * Strip html from string using string-strip-html
 * Used when fetching events from ms graph
 * Strips the html from event body
 *
 * @param {string} str String
 */
export const stripHtmlString = (str: string): string => stringStripHtml(str).result
