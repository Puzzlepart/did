import express, { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { SigninError } from 'server/middleware/passport/errors'
import env from '../utils/env'
const router = express.Router()

router.get('/signin', (request: Request, response: Response, next: NextFunction) => {
  passport.authenticate('azuread-openidconnect', {
    prompt: env('OAUTH_SIGNIN_PROMPT'),
    failureRedirect: '/'
  })(request, response, next)
})

router.post('/callback', (request: Request, response: Response, next: NextFunction) => {
  passport.authenticate('azuread-openidconnect', {}, (error: SigninError) => {
    if (error) {
      request.session.destroy(() => {
        response.render('index', { error: error.toString() })
      })
    } else {
      response.redirect('/timesheet')
    }
  })(request, response, next)
})

router.get('/signout', (request: Request, response: Response) => {
  request.session.destroy(() => {
    request.logOut()
    response.redirect('/')
  })
})

export default router
