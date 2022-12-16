const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const TEMP_USERS = [
  {
    id: "u1",
    fullName: "dorin",
    shippingAddress: "test 77",
    email: "test@test.com",
    creditCardNumber: "123456789",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: TEMP_USERS });
};

const confirmOrder = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { fullName, shippingAddress, email, creditCardNumber } = req.body;

  const createdUser = new User({
    fullName,
    shippingAddress,
    email,
    creditCardNumber,
  });
  TEMP_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

exports.getUsers = getUsers;
exports.confirmOrder = confirmOrder;
