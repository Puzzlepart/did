const { version } = require('../package.json');
const express = require('express');
const router = express.Router();
const _ = require('underscore');


router.get('/', (req, res) => {
  const host = req.get('host');
  let context = { info: { version } };
  if (req.user) {
    let user = _.omit(req.user, 'oauthToken');
    context.user = { ...user.data, ...user.profile };
  }
  let sub = host.split('.')[0].split('-');
  if (process.env.DEVELOPMENT_BRANCH) {
    context.info.branch = process.env.DEVELOPMENT_BRANCH;
  } else {
    context.info.branch = sub[1] || null;
  }
  res.locals.version = version;
  res.render('index', { context: JSON.stringify(context) });
});

module.exports = router;
