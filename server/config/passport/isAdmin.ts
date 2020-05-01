export async function isAdmin(req, res, next) {
    if (req.user.data.role === "Admin") {
        next();
    } else {
        res.redirect('/');
    }
};