import { NextFunction, Request, Response, Router } from 'express'
import passport from 'passport'
import url from 'url'
import environment from '../utils/environment'
const auth = Router()

auth.get(
  '/signin',
  (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate('azuread-openidconnect', {
      prompt: environment('OAUTH_SIGNIN_PROMPT'),
      failureRedirect: '/'
    })(request, response, next)
  }
)

auth.post(
  '/callback',
  (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate(
      'azuread-openidconnect',
      (error: Error, user: Express.User) => {
        if (error || !user) {
          return response.redirect(
            url.format({
              pathname: '/',
              query: {
                name: error?.name,
                message: error?.message
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
