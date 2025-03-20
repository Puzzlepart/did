import { Response } from 'express'
import { renderErrorPage } from './renderErrorPage'
import path from 'path'

/**
 * Renders a page and sends the HTML response to the client.
 *
 * @param response - The Express `Response` object used to send the response.
 * @param page - The name of the page to render.
 * @param statusCode - The HTTP status code to use for the response. Defaults to 200.
 *
 * @returns The rendered HTML response or a fallback error page if rendering fails.
 *
 * If an error occurs during rendering, a 503 status code is sent along with
 * a static error page located at `../public/errors/503.html`.
 */
export function renderPage(
  response: Response,
  page: string,
  statusCode: number = 200
) {
  if (page.endsWith('.html')) {
    return response.sendFile(path.join(__dirname, `../public/pages/${page}`))
  }
  return response.render(page, {}, (err, html) => {
    if (err) {
      return renderErrorPage(response, 503)
    }
    return response.status(statusCode).send(html)
  })
}
