import { Response } from 'express'
import path from 'path'

/**
 * Renders a page and sends the HTML response to the client.
 *
 * @param response - The Express `Response` object used to send the response.
 * @param page - The name of the page to render.
 * @param statusCode - The HTTP status code to use for the response. Defaults to 200.
 * @param options - Additional options for rendering the page.
 *
 * @returns The rendered HTML response or a fallback error page if rendering fails.
 *
 * If an error occurs during rendering, a 503 status code is sent along with
 * a static error page located at `../public/errors/503.html`.
 */
export function renderPage(
  response: Response,
  page: string,
  statusCode: number = 200,
  options: Record<string, any> = {}
) {
  if (page.endsWith('.html')) {
    return response.sendFile(path.join(__dirname, `../public/pages/${page}`))
  }
  return response.render(page, options, (err, html) => {
    if (err) {
      return renderErrorPage(response, 503)
    }
    return response.status(statusCode).send(html)
  })
}

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
