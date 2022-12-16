const express = require("express");
const bodyParser = require("body-parser");
const products = require("./routes/products");

const server = express();

server.use("/", products);

server.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});
server.listen(5000); // start Node + Express server on port 5000
