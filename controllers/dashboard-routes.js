// router
const router = require("express").Router();

// Dependencies
const sequelize = require("../config/connection");
const {Post, User, Comment} = require("../models");
const auth = require("../utils/auth")

module.exports = router;

// Routes
router.get("/", auth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            "id",
            "title",
            "content",
            "created"
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    "id",
                    "user_id",
                    "post_id",
                    "comments",
                    "created"
                ],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
    .then((dbPostData) => {
        const posts = dbPostData.map((post) => post.get({plain: true}));
        res.render("dashboard", {posts, loggedIn: true});
    })
    .catch((err) => {
        console.log(err);
        res.status(500)
        .json(err);
    });
});

