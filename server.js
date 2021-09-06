//Dependencies

const express = require("express");
const path = require("path");
const expressHandlebars = require("express-handlebars");
const expressSession = require("express-session");
const he

const PORT = process.env.PORT || 3001;

const sequelizeStore = require("connect-session-sequelize")(expressSession.Store);

// Initialize
const app = express();