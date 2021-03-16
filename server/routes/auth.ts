import { NextFunction, Request, Response, Router } from 'express'
import passport from 'passport'
import url from 'url'
import { SigninError, SIGNIN_FAILED } from '../middleware/passport/errors'
import { environment } from '../utils'
const auth = Router()

const REDIRECT_URL_PROPERTY = '__redirectUrl'

/**
 * Handler for /auth/signin
 *
 * @param request - Request
 * @param response - Response
 * @param next - Next function
 */
export const signInHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  request.session.regenerate(() => {
    request.session[REDIRECT_URL_PROPERTY] = request.query.redirectUrl
    passport.authenticate('azuread-openidconnect', {
      prompt: environment('OAUTH_SIGNIN_PROMPT'),
      failureRedirect: '/'
    })(request, response, next)
  })
}

/**
 * Handler for /auth/signin/google
 *
 * @param request - Request
 */
export const googleSignInHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  request.session.regenerate(() => {
    request.session[REDIRECT_URL_PROPERTY] = request.query.redirectUrl
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/calendar.readonly'
      ]
    })(request, response, next)
  })
}

/**
 * Handler for /auth/callback and  /auth/google/callback
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

auth.get('/signin', signInHandler)

auth.get('/google/signin', googleSignInHandler)

auth.post('/callback', authCallbackHandler('azuread-openidconnect'))

auth.get('/google/callback', authCallbackHandler('google'))

auth.get('/signout', signOutHandler)

export default auth
