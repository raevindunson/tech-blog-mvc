// Models

const Comment = require("./Comment");
const Post = require("./Post");
const User = require("./User");

//Associations
User.hasMany(Post, {
    foreignKey: "user_id"
});

User.hasMany(Comment, {
    foreignKey: "user_id",
    hooks: true
});

Post.belongsTo(User, {
    foreignKey: "user_id"
});

Post.hasMany(Comment, {
    foreignKey: "post_id",
    hooks: true
});

Comment.belongsTo(User, {
    foreignKey: "user_id",
    hooks: true
});

Comment.belongsTo(Post, {
    foreignKey: "post_id",
    hooks: true
});

module.exports = {User, Post, Comment};