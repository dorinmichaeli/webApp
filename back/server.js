const express = require("express");
const bodyParser = require("body-parser");
const productsRouters = require("./routes/products");
const HttpError = require("./models/httpError");

const server = express();
server.use(bodyParser.json());

server.use("/api", productsRouters);

server.use((req, res, next) => {
  const error= new HttpError('Could not find this route', 404);
  throw error;
});

server.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});
server.listen(5000); // start Node + Express server on port 5000
