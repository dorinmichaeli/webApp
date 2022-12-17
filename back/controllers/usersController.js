const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const User = require("../models/user");


const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find(
      {},
      "fullName shippingAddress email creditCardNumber"
    );
  } catch (err) {
    return next(
      new HttpError("Get users failed, please try again later.", 500)
    );
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const confirmOrder = async (req, res, next) => {
  const { fullName, shippingAddress, email, creditCardNumber } = req.body;

  const createdUser = new User({
    fullName,
    shippingAddress,
    email,
    creditCardNumber,
  });

  try {
    await createdUser.save();
  } catch (err) {
    // console.log(err);
    const error = new HttpError("Created user failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

exports.getUsers = getUsers;
exports.confirmOrder = confirmOrder;
