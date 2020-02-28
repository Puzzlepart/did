const express = require('express');
const router = express.Router()
const isAuthenticated = require('../middleware/passport/isAuthenticated');
const isAdmin = require('../middleware/passport/isAdmin');

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

router.get('/reports', [isAuthenticated, isAdmin], (req, res) => {
  res.render('reports', { active: { reports: true }, props: JSON.stringify(req.params) });
});

router.get('/admin', [isAuthenticated, isAdmin], (req, res) => {
  res.render('admin', { active: { admin: true }, props: JSON.stringify({ view: 'reports' }) });
});

module.exports = router;
