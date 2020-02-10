module.exports = async (req, res, next) => {
    if (!req.user || !req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
};