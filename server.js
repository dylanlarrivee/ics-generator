"use strict";
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

const PORT = (process.env.PORT || 3000);

const icsGeneratorRoutes = require("./routes/icsGeneratorRoutes");

// HTTP request logger
app.use(morgan("tiny"));

// Body parser
app.use(bodyParser.json());

app.use("/api", icsGeneratorRoutes);

let server = app.listen(PORT, function () {
    console.log(`Server is starting at ${PORT}`);
  });
  
  // app.listen(PORT, console.log(`Server is starting at ${PORT}`));
  
  module.exports = server
  