//Dependencies

const express = require("express");
const path = require("path");
const expressHandlebars = require("express-handlebars");
const expressSession = require("express-session");
const handlebarshelp = expressHandlebars.create({helpers});

const connection = require("./config/connection");
const helpers = require("./utils/helpers");
const controllers = require("./controllers");
const sequelize = require("./config/connection");


const PORT = process.env.PORT || 3001;

const sequelizeStore = require("connect-session-sequelize")(expressSession.Store);

// Initialize
const app = express();

const sess = {

}

app.use(expressSession(sess));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.engine("handlebars", handlebarshelp.engine);

// Connnect to server
sequelize