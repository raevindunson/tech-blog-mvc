const auth = (req, res, next) => {
    if (!req.expressSession.user_id) {
        res.redirect("/login");
    } else {
        next();
    }
};

module.exports = auth;