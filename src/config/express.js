const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("../routes");
const { env } = require("./vars");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.raw({ limit: "50mb" }));

app.use(express.static("public"));

// enable CORS
app.use(cors());

// NO fileupload middleware here

// mount routes
app.use("/", routes);

module.exports = app;
