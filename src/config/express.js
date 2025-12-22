const express = require("express");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const cors = require("cors");
const routes = require("../routes");
const { env } = require("./vars");

// Express configuration
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

app.use(
  fileupload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
    debug: env === "DEV",
  })
);

app.use(express.static("public"));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

//mount api routes
app.use("/", routes);

module.exports = app;
