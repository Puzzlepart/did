import { Request, Response } from 'express'

function renderPage(
  response: Response,
  page: string,
  statusCode: number = 200
) {
  return response.render(page, {}, (err, html) => {
    if (err) {
      return response.status(503).send('Internal Server Error')
    }
    return response.status(statusCode).send(html)
  })
}

/**
 * Default route handler for the root path `/`. It checks if the user is
 * authenticated and redirects to the login page if not.
 *
 * If the index page is rendered successfully, it sends a 200 status code
 * with the rendered HTML. If there is an error during rendering,
 * it sends a 503 status code with an 'Internal Server Error' message. This
 * is probably due to a deployment in progress.
 */
export default (request: Request, response: Response) => {
  const url = request.originalUrl.split('?')[0]
  if (request.isUnauthenticated() && url !== '/') {
    return response.redirect(
      `/auth/azuread-openidconnect/signin?redirectUrl=${request.originalUrl}`
    )
  }
  switch (url) {
    case '/terms_of_service': {
      return renderPage(response, 'terms_of_service', 200)
    }
    case '/privacy_statement': {
      return renderPage(response, 'privacy_statement', 200)
    }
    default: {
      return renderPage(response, 'index', 200)
    }
  }
}

export { default as authRoute } from './auth'
