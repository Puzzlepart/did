const express = require('express');
const router = express.Router();
const _ = require('underscore');

router.get('/', (req, res) => {
  let context = {};
  if (req.user) {
    let user = _.omit(req.user, 'oauthToken');
    context.user = { ...user.data, ...user.profile };
  }
  res.render('index', { context: JSON.stringify(context) });
});

module.exports = router;
