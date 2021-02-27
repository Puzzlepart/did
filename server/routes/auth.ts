import { NextFunction, Request, Response, Router } from 'express'
import passport from 'passport'
import env from '../utils/env'
import url from 'url'
const auth = Router()

auth.get(
  '/signin',
  (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate('azuread-openidconnect', {
      prompt: env('OAUTH_SIGNIN_PROMPT'),
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
        request.logIn(user, (err) => {
          if (err)
            return response.render('index', { error: JSON.stringify(err) })
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
