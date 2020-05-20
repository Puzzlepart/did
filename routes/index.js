const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  console.log(req.url)
  console.log(Object.keys(req))
  if (!req.user || !req.isAuthenticated()) {
    res.redirect('/auth/signin')
  } else {
    res.render('index')
  }
})

module.exports = router
