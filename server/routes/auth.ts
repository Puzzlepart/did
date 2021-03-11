import { NextFunction, Request, Response, Router } from 'express'
import passport from 'passport'
import url from 'url'
import { SigninError, SIGNIN_FAILED } from '../middleware/passport/errors'
import { environment } from '../utils'
const auth = Router()

auth.get(
  '/signin',
  (request: Request, response: Response, next: NextFunction) => {
    request.session.regenerate(() => {
      passport.authenticate('azuread-openidconnect', {
        prompt: environment('OAUTH_SIGNIN_PROMPT'),
        failureRedirect: '/'
      })(request, response, next)
    })
  }
)

auth.post(
  '/callback',
  (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate(
      'azuread-openidconnect',
      (error: Error, user: Express.User) => {
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
          if (error_)
            return response.render('index', { error: JSON.stringify(error_) })
          return response.redirect('/timesheet')
        })
      }
    )(request, response, next)
  }
)

auth.get('/signout', (request: Request, response: Response) => {
  request.session.destroy(() => {
    request.logOut()
    response.redirect('/')
  })
})

export default auth
