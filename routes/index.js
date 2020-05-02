const express = require('express');
const router = express.Router();
const _ = require('underscore');

router.get('/', (req, res) => {
  const host = req.get('host');
  let context = { info: res.locals.info };
  if (req.user) {
    let user = _.omit(req.user, 'oauthToken');
    context.user = { ...user.data, ...user.profile };
  }
  try {
    let sub = host.split('.')[0].split('-');
    context.info = sub[1] ? { branch: sub[1] } : {};
  } catch (error) { }
  res.render('index', { context: JSON.stringify(context) });
});

module.exports = router;
