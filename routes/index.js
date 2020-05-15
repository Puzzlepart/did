const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.user || !req.isAuthenticated()) {
    res.redirect('/auth/signin');
  } else {
    res.render('index');
  }
});

module.exports = router;
