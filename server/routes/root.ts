import express from 'express';
const router = express.Router()
import { isAuthenticated, isAdmin } from '../middleware/passport';

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

export default router;
