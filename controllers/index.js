// Router
const router = require("express").Router();

// Controllers
const apiRoutes = require("./api");
const dashboardRoutes = require("./dashboard-routes.js")
const homeRoutes = require("./home-routes.js");

// Routes for apis
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/home", homeRoutes);

// router catch error
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;