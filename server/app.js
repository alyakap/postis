//requiring express and middlewares
require("dotenv").config({
  path: ".env." + (process.env.NODE_ENV || "development")
});
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mainRouter = require("./controller");

//start server

const app = express();

//setting up middlewares
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("tiny"));
}

// add logs on the server's terminal

// add cors support
app.use(cors());

// support parsing of application/json type post data
app.use(express.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));

mainRouter(app); // require('./controller')(app)
module.exports = app;
