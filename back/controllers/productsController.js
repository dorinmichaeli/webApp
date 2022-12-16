const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

let TEMP_PRODUCT = [
  {
    id: "p1",
    name: "snickers",
    description: "chocolate",
    price: "1$",
  },
];

const getProductById = (req, res, next) => {
  const productId = req.params.pid;

  const product = TEMP_PRODUCT.find((p) => {
    return p.id === productId;
  });

  if (!product) {
    return next(
      new HttpError("Could not find a product for the provided id.", 404)
    );
  }
  res.json({ product });
};

const createProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, description, price } = req.body;
  const createdProduct = {
    name,
    description,
    price,
    image,
  };
  TEMP_PRODUCT.push(createdProduct);

  res.status(201).json({ product: createdProduct });
};

const updateProduct = (req, res, next) => {
  const { name, description, price, image } = req.body;
  const productId = req.params.pid;

  const updatedProduct = { ...TEMP_PRODUCT.find((p) => p.id === productId) };
  const productIndex = TEMP_PRODUCT.findIndex((p) => p.id === productId);
  updatedProduct.name = name;
  updatedProduct.description = description;
  updatedProduct.price = price;
  updatedProduct.image = image;

  TEMP_PRODUCT[productIndex] = updatedProduct;

  res.status(200).json({ product: updatedProduct });
};

const deleteProduct = (req, res, next) => {
  const productId = req.params.pid;
  TEMP_PRODUCT = TEMP_PRODUCT.filter((p) => p.id !== productId);
  res.status(200).json({ message: "Deleted product" });
};

exports.getProductById = getProductById();
exports.createProduct = createProduct();
exports.updateProduct = updateProduct();
exports.deleteProduct = deleteProduct();
