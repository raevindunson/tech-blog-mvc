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

router.get("/edit/:id", auth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
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
                attributes: ["id","user_id","post_id", "comments", "created"],
                include:{
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
        if (!dbPostData) {
            res.status(404)
            .json({MessageEvent: "No post was found based on this id"});
            return;
        }
        const post = dbPostData.get({plain: true});
        res.render('edit-post', {post, loggedIn: true});
    })
    .catch((err) => {
        console.log(err);
        res.status(500)
        .json(err);
    });
});

router.get("/edit", auth, (req, res) => {
    User.findOne({
    })
})

module.exports = router;