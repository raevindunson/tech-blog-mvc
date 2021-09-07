// Router
const router = require("express").Router();

// Dependencies, Connections, and Models
const {User, Post, Comment} = require("../../models");
const sequelize = require("../../config/connection");
const auth = require("../../utils/auth");
const { where } = require("sequelize/types");

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

router.post("/", auth, (req, res) => {
    Post.create({
        title: req.body.title,
        user_id: req.session.user_id,
        posts: req.body.posts
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

router.put("/:id", auth, (req, res) => {
    Post.update({
        title: req.body.title,
        posts: req.body.posts
    })
    .then((dbPostData) => {
        if (!dbPostData) {
            res.status(404)
            .json({MessageEvent: "There was no post found based on this id"});
            return;
        }})
        .catch((err) => {
            console.log(err);
            res.status(500)
            .json(err);
        });
});

router.delete("/:id", auth, (req, res) => {
    Post.destroy({
        where: {id: req.params.id}
    })
    .then((dbPostData) => {
        if (!dbPostData) {
            res.status(404)
            .json({MessageEvent: "There was no post found based on this id"});
            return;
        }
        res.json(dbPostData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500)
        .json(err);
    });
});

module.exports = router;