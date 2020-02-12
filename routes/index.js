const express = require('express');
const router = express.Router()
const isAuthenticated = require('../middleware/passport/isAuthenticated');

router.get('/', function (_req, res) {
  res.render('index', { active: { home: true } });
});

router.get('/timesheet', isAuthenticated, (req, res) => {
  res.render('timesheet', { active: { timesheet: true }, props: JSON.stringify(req.params) });
});

router.get('/customers', isAuthenticated, (req, res) => {
  res.render('customers', { active: { customers: true }, props: JSON.stringify(req.params) });
});

router.get('/projects', isAuthenticated, (req, res) => {
  res.render('projects', { active: { projects: true }, props: JSON.stringify(req.params) });
});

router.get('/faq', isAuthenticated, (req, res) => {
  res.render('faq', { active: { faq: true }, props: JSON.stringify(req.params) });
});

router.get('/admin', isAuthenticated, (req, res) => {
  res.render('admin', { active: { admin: true }, props: JSON.stringify({ view: 'reports' }) });
});

router.get('/admin/users/:userId', isAuthenticated, (req, res) => {
  res.render('admin-user', { active: { admin: true }, props: JSON.stringify(req.params) });
});

module.exports = router;
