const { check } = require("express-validator");
const express = require("express");
const usersController = require("../controllers/usersController");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/",
  [
    check("fullName").not().isEmpty(),
    check("shippingAddress").not().isEmpty(),
    check("email").not().isEmpty(),
    check("creditCardNumber").not().isEmpty(),
  ],
  usersController.confirmOrder
);

module.exports = router;
