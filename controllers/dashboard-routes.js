// router
const router = require("express").Router();

// Dependencies
const sequelize = require("../config/connection");
const {Post, User, Comment} = require("../models");
const auth = require("../utils/auth")

module.exports = router;

// Routes
router.get("/", auth, (req, res) => {
    Post.find({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            "id",
        ]
    })
})