import { Request, Response } from 'express'

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
  return response.render('index', {}, (err, html) => {
    if (err) {
      return response.status(503).send('Internal Server Error')
    }
    return response.status(200).send(html)
  })
}

export { default as authRoute } from './auth'
