import { Request, Response } from 'express'
import { handleMaintenanceMode, isMaintenanceMode } from './maintenanceMode'
import { renderPage } from './utils'

// Define public routes that don't require authentication
const publicRoutes = new Set(['/termsofservice', '/privacystatement', '/'])

/**
 * Default route handler for the root path `/`. It checks if the user is
 * authenticated and redirects to the login page if not.
 *
 * If the index page is rendered successfully, it sends a 200 status code
 * with the rendered HTML. If there is an error during rendering,
 * it sends a 503 status code with an 'Internal Server Error' message. This
 * is probably due to a deployment in progress.
 *
 * A
 */
export default (request: Request, response: Response) => {
  const url = request.originalUrl.split('?')[0]

  // If maintenance mode is enabled, render the maintenance page for all routes
  // except API routes which might be needed by the maintenance page itself
  if (isMaintenanceMode()) {
    return handleMaintenanceMode(response)
  }

  // Only check authentication for non-public routes
  if (request.isUnauthenticated() && !publicRoutes.has(url)) {
    return response.redirect(
      `/auth/azuread-openidconnect/signin?redirectUrl=${request.originalUrl}`
    )
  }

  switch (url) {
    case '/termsofservice': {
      return renderPage(response, 'termsofservice.html', 200)
    }
    case '/privacystatement': {
      return renderPage(response, 'privacystatement.html', 200)
    }
    default: {
      return renderPage(response, 'index', 200)
    }
  }
}

export { default as authRoute } from './auth'
