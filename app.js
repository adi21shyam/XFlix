const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes/v1/index");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

app.use("/v1", routes);

module.exports = app;