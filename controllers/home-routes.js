// Router and Dependencies
const router = require("express").Router();
const sequelize = require("../config/connection");
const {Post, User, Comment} = require("../models");

//Routes
router.get("/", (req, res) => {
    Post.findAll({
        attributes: [
            "id",
            "title",
            "content",
            "created"
        ],
        include: [
            {
                model: Comment,
                attributes: ["id", "user_id", "post_id", "comments", "created"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
        ]
    })
    .then((dbPostData) => {
        const posts = dbPostData.map((post) => post.get({plain: true}));
        res.render("homepage", {
            posts
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500)
        .json(err);
    });
});

router.get("/post/:id", (req, res) => {
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
                attributes: ["id", "user_id", "comments", "created"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
        ]  
    })
    .then((dbPostData) => {
        if(!dbPostData) {
            res.status(404)
            .json({MessageEvent: "There is no post found based on this id"});
            return;
        }
        const post = dbPostData.get({plain: true});
        res.render("login", {
            post
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500)
        .json(err);
    });
});

module.exports = router;