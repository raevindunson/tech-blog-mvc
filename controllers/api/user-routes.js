// router and dependencies
const router = require("express").Router();

// Models
const {User, Post, Comment} = require("../../models");
const auth = require("../../utils/auth");
const sequelizeStore = require("connect-session-sequelize")(session.Store);
const session = require("express-session");

// User Routes
router.get("/", (req, res) => {
    User.findAll({
        attributes: [
            "username"
        ]
    })
    .then((dbUserData) => {
        res.json(dbUserData)
    })
    .catch((err) => {
        console.log(err);
        res.status(500)
        .json(err);
    });
});

router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then((dbUserData) => {
        req.session.save(() => {
            req.session.username = dbUserData.username;
            res.json(dbUserData);
        });
    });
});

router.put("/:id", auth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {id: req.params.id}
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404)
            .json({MessageEvent: "There was no user found based on this id"});
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500)
        .json(err);
    });
});

router.delete("/:id", auth, (req, res) => {
    User.destroy({
        where: {id: req.params.id}
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404)
            .json({MessageEvent: "There was no user found with this id"});
            return;
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500)
        .json(err);
    });
});

module.exports = router;