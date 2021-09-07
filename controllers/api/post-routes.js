// Router
const router = require("express").Router();

// Dependencies, Connections, and Models
const {User, Post, Comment} = require("../../models");
const sequelize = require("../../config/connection");
const auth = require("../../utils/auth");

// Routes
router.get("/", (req, res) => {
    Post.findAll({
        attributes: [
            "id",
            "title",
            "posts",
            "created"
        ],
        include: [
            {
                model: User,
                attributes: ["username"]
            },
            {
                model: Comment,
                attributes: [
                    "id",
                    "user_id",
                    "post_id",
                    "comments",
                    "created"
                ]
            }
        ]
    })
    .then((dbPostData) => {
        res.json(dbPostData)
    })
    .catch((err) => {
        console.log(err);
        res.status(500)
        .json(err);
    });
});

