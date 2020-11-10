import express from 'express'
import passport from 'passport'
import env from '../utils/env'
const router = express.Router()

router.get('/signin', (request, response, next) => {
  passport.authenticate('azuread-openidconnect', {
    response,
    prompt: env('OAUTH_SIGNIN_PROMPT'),
    failureRedirect: '/'
  } as any)(request, response, next)
})

router.post('/callback', (request, response, next) => {
  passport.authenticate('azuread-openidconnect', {
    response,
    failureRedirect: '/',
    successRedirect: '/timesheet'
  } as any)(request, response, next)
})

router.get('/signout', (request, response) => {
  request['session'].destroy(() => {
    request['logout']()
    response.redirect('/')
  })
})

export default router
