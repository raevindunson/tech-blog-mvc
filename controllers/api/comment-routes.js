// Routes and Dependencies
const router = require("express").Router();
const {Comment} = require("../../models");
const auth = require("../../utils/auth");

// Route to get comments
router.get("/", (req, res) => {
    Comment.findAll()
    .then((dbCommentData) => {
        res.json(dbCommentData)
    })
    .catch((err) => {
        console.log(err);
        res.status(500)
        .json(err);
    });
});

router.post("/", auth, (req, res) => {
    if (req.session) {
        Comment.create({
            user_id: req.session.user_id,
            post_id: req.body.post_id,
            comments: req.body.comments
        })
        .then((dbCommentData) => {
            res.json(dbCommentData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400)
            .json(err);
        });
    }
});

router.delete("/:id", auth, (req, res) => {
    Comment.destroy({
        where: {id: req.params.id}
    })
    .then((dbCommentData) => {
        if(!dbCommentData) {
            res.status(404)
            .json({MessageEvent: "There was no comment found based on the given id"});
            return;
        }
        res.json(dbCommentData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500)
        .json(err);
    });
});

module.exports = router;