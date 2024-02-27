const express = require("express");
const app = express();

const apiRouter = require('../routers/api.router.js');

const {
  handleCustomError,
  handleNotNullConstraint,
  handleServerError,
  handleBadRequest,
  handleNotFound,
} = require("../controllers/errors.controllers.js");

app.use(express.json());

app.use('/api', apiRouter)


app.use(handleBadRequest);
app.use(handleNotFound);
app.use(handleNotNullConstraint);
app.use(handleCustomError);
app.use(handleServerError);

module.exports = app;
