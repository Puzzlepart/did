module.exports = async (req, res, next) => {
    if (req.user.data.role === "Admin") {
        next();
    } else {
        res.redirect('/');
    }
};