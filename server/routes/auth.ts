import createDebug from 'debug'
import { NextFunction, Request, Response, Router } from 'express'
import passport from 'passport'
import { SigninError, SIGNIN_FAILED } from '../middleware/passport/errors'
import env from '../utils/env'
const debug = createDebug('server/routes/auth')
const auth = Router()

auth.get('/signin', (request: Request, response: Response, next: NextFunction) => {
  passport.authenticate('azuread-openidconnect', {
    prompt: env('OAUTH_SIGNIN_PROMPT'),
    failureRedirect: '/'
  })(request, response, next)
})

auth.post('/callback', (request: Request, response: Response, next: NextFunction) => {
  passport.authenticate('azuread-openidconnect', (error: SigninError, user: Express.User) => {
    if (error) {
      debug('Sign in failed with error code %s', error.code)
      return response.render('index', { error: error.toString() })
    }
    if (!user) {
      debug('Sign in failed with error code %s', SIGNIN_FAILED.code)
      return response.render('index', { error: SIGNIN_FAILED.toString() })
    }
    request.logIn(user, (err) => {
      if (err) return response.render('index', { error: JSON.stringify(err) })
      return response.redirect('/timesheet')
    })
  })(request, response, next)
})

auth.get('/signout', (request: Request, response: Response) => {
  request.session.destroy(() => {
    request.logOut()
    response.redirect('/')
  })
})

export default auth
