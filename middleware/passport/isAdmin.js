module.exports = async (req, res, next) => {
    if (!req.user || !req.isAuthenticated()) {
        res.redirect('/');
    } else {
        if (!req.user.data) {
            res.redirect('/');
        }
        if (req.user.data.role === "Admin") {
            next();
        } else {
            res.redirect('/');
        }
    }
};