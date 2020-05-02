var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/signin',
  (req, res, next) => {
    passport.authenticate('azuread-openidconnect',
      {
        response: res,
        prompt: process.env.OAUTH_SIGNIN_PROMPT,
        failureRedirect: '/',
      }
    )(req, res, next);
  },
);

router.post('/callback', (req, res, next) => {
  passport.authenticate('azuread-openidconnect',
    {
      response: res,
      failureRedirect: '/',
      successRedirect: '/timesheet',
    }
  )(req, res, next);
});

router.get('/signout', (req, res) => {
  req.session.destroy((_err) => {
    req.logout();
    res.redirect('/');
  });
});

module.exports = router;