import express from 'express'
import passport from 'passport'
import env from '../utils/env'
const router = express.Router()

router.get('/signin', (request: express.Request, response: express.Response, next: express.NextFunction) => {
  passport.authenticate('azuread-openidconnect', {
    response,
    prompt: env('OAUTH_SIGNIN_PROMPT'),
    failureRedirect: '/'
  } as any)(request, response, next)
})

router.post('/callback', (request: express.Request, response: express.Response, next: express.NextFunction) => {
  passport.authenticate('azuread-openidconnect', {
    response,
    failureRedirect: '/',
    successRedirect: '/timesheet'
  } as any)(request, response, next)
})

router.get('/signout', (request: express.Request, response: express.Response) => {
  request.session.destroy(() => {
    request.logOut()
    response.redirect('/')
  })
})

export default router
