export async function isAuthenticated(req, res, next) {
    if (!req.user || !req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
};