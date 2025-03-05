/**
 * NodeJS `express` auth route
 *
 * Handles authentication with providers/strategies
 * `azuread-openidconnect` and `google`
 *
 * @module AuthRoute
 */
import { NextFunction, Request, Response, Router } from 'express'
import passport from 'passport'
import _ from 'underscore'
import url from 'url'
import {
  SigninError,
  GENERIC_SIGNIN_FAILED
} from '../middleware/passport/errors'
import { environment } from '../utils'
const auth = Router()

const REDIRECT_URL_PROPERTY = '__redirectUrl'
type AuthProvider = 'azuread-openidconnect' | 'google'

/**
 * Handler for `/auth/azuread-openidconnect/signin` and `/auth/google/signin
 *
 * @remarks Regenerates the session before authenticating with the provided
 * strategy using `request.session.regenerate`.
 */
export const signInHandler =
  (strategy: AuthProvider, options: passport.AuthenticateOptions) =>
    (request: Request, response: Response, next: NextFunction) => {
      request.session.regenerate(() => {
        request.session[REDIRECT_URL_PROPERTY] = request.query.redirectUrl
        passport.authenticate(strategy, options)(request, response, next)
      })
    }

/**
 * Handler for `/auth/azuread-openidconnect/callback` and  `/auth/google/callback`.
 *
 * Authenticates the user using the provided strategy, then redirects the user to
 * the root path if the user is not authenticated.
 *
 * For now it uses the deprecated `url.format` method to redirect the user to the
 * root path with an error message if the user is not authenticated.
 */
export const authCallbackHandler =
  (strategy: AuthProvider) =>
    (request: Request, response: Response, next: NextFunction) => {
      passport.authenticate(strategy, (error: Error, user: Express.User) => {
        if (error || !user) {
          const _error =
            error instanceof SigninError ? error : GENERIC_SIGNIN_FAILED
          return response.redirect(
            url.format({
              pathname: '/',
              query: {
                client_code: _error.code,
                client_response: _error?.toString()
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
 * Handler for `/auth/signout`. Destroys the session using
 * `request.session.destroy`, logs out the user using `request.logOut`,
 * then redirects the user to the root path.
 *
 * @param request - Request
 * @param response - Response
 */
export const signOutHandler = (request: Request, response: Response) => {
  request.session.destroy(() => {
    request.logOut(() => {
      response.redirect('/')
    })
  })
}

const authProviders = environment<string[]>('AUTH_PROVIDERS', [], {
  splitBy: ' '
})

if (_.contains(authProviders, 'azuread-openidconnect')) {
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

if (_.contains(authProviders, 'google')) {
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
