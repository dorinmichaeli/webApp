const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productsRouters = require("./routes/products");
const usersRouters = require("./routes/users");
const HttpError = require("./models/httpError");
mongoose.set("strictQuery", true);
const cors = require("cors");

const server = express();
server.use(bodyParser.json());
server.use(cors());

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

server.use("/api", productsRouters);
server.use("/checkout", usersRouters);

server.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

server.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

mongoose
  .connect(
    "mongodb+srv://db:QAZwsx13579@cluster0.cejtut0.mongodb.net/products?retryWrites=true&w=majority"
  )
  .then(() => {
    server.listen(5000, () => console.log("connected to db"));
  })
  .catch((err) => {
    console.log(err);
  });
