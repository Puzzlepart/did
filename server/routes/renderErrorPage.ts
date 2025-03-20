import { Response } from 'express'
import path from 'path'

/**
 * Renders an error page by sending an HTML file corresponding to the specified status code.
 *
 * @param response - The HTTP response object used to send the error page.
 * @param statusCode - The HTTP status code for the error page. Defaults to 503.
 */
export function renderErrorPage(response: Response, statusCode: number = 503) {
  const errorPagePath = path.join(
    __dirname,
    `../public/errors/${statusCode}.html`
  )
  response.status(statusCode).sendFile(errorPagePath)
}
