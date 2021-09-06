const express = require("express");
const sequelize = require("path");
const expressHandlebars = require("express-handlebars");
const expressSession = require("express-session");

const PORT = process.env.PORT || 3001;

const app = express();

const sequelizeStore = require("connect")