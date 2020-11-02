const express = require('express')
const passport = require('passport')
const env = require('../utils/env')
const router = express.Router()

router.get('/signin', (req, res, next) => {
  passport.authenticate('azuread-openidconnect', {
    response: res,
    prompt: env('OAUTH_SIGNIN_PROMPT'),
    failureRedirect: '/',
  })(req, res, next)
})

router.post('/callback', (req, res, next) => {
  passport.authenticate('azuread-openidconnect', {
    response: res,
    failureRedirect: '/',
    successRedirect: '/timesheet',
  })(req, res, next)
})

router.get('/signout', (req, res) => {
  req.session.destroy(() => {
    req.logout()
    res.redirect('/')
  })
})

module.exports = router
