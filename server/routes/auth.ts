/* eslint-disable tsdoc/syntax */
/**
 * NodeJS Express App auth route
 *
 * @module AuthRoute
 */
import { NextFunction, Request, Response, Router } from 'express'
import passport from 'passport'
import { contains } from 'underscore'
import url from 'url'
import { SigninError, SIGNIN_FAILED } from '../middleware/passport/errors'
import { environment } from '../utils'
const auth = Router()

const REDIRECT_URL_PROPERTY = '__redirectUrl'

/**
 * Handler for /auth/azuread-openidconnect/signin and /auth/google/signin
 *
 * @param request - Request
 * @param response - Response
 * @param next - Next function
 */
export const signInHandler = (
  strategy: 'azuread-openidconnect' | 'google',
  options: passport.AuthenticateOptions
) => (request: Request, response: Response, next: NextFunction) => {
  request.session.regenerate(() => {
    request.session[REDIRECT_URL_PROPERTY] = request.query.redirectUrl
    passport.authenticate(strategy, options)(request, response, next)
  })
}

/**
 * Handler for /auth/azuread-openidconnect/callback and  /auth/google/callback
 *
 * @param request - Request
 * @param response - Response
 * @param next - Next function
 */
export const authCallbackHandler = (
  strategy: 'azuread-openidconnect' | 'google'
) => (request: Request, response: Response, next: NextFunction) => {
  passport.authenticate(strategy, (error: Error, user: Express.User) => {
    if (error || !user) {
      const _error = error instanceof SigninError ? error : SIGNIN_FAILED
      return response.redirect(
        url.format({
          pathname: '/',
          query: {
            name: _error?.name,
            message: _error?.message,
            icon: _error?.icon
          }
        })
      )
    }
    request.logIn(user, (error_) => {
      if (error_) {
        return response.render('index', { error: JSON.stringify(error_) })
      }
      const redirectUrl =
        request.session[REDIRECT_URL_PROPERTY] ||
        user['startPage'] ||
        '/timesheet'
      return response.redirect(redirectUrl)
    })
  })(request, response, next)
}

/**
 * Handler for /auth/signout
 *
 * @param request - Request
 * @param response - Response
 * @param next - Next function
 */
export const signOutHandler = (request: Request, response: Response) => {
  request.session.destroy(() => {
    request.logOut()
    response.redirect('/')
  })
}

const authProviders = environment<string[]>('AUTH_PROVIDERS', [], {
  splitBy: ' '
})

if (contains(authProviders, 'azuread-openidconnect')) {
  auth.get(
    '/azuread-openidconnect/signin',
    signInHandler('azuread-openidconnect', {
      prompt: environment('MICROSOFT_SIGNIN_PROMPT'),
      failureRedirect: '/'
    })
  )
  auth.post(
    '/azuread-openidconnect/callback',
    authCallbackHandler('azuread-openidconnect')
  )
}

if (contains(authProviders, 'google')) {
  auth.get(
    '/google/signin',
    signInHandler('google', {
      scope: environment('GOOGLE_SCOPES', undefined, { splitBy: ' ' })
    })
  )
  auth.get('/google/callback', authCallbackHandler('google'))
}

auth.get('/signout', signOutHandler)

export default auth
