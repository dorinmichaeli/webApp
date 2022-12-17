const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const Product = require("../models/product");

const getAllProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find({}, "name description price image");
    console.log(products);
  } catch (err) {
    return next(new HttpError("Fetching users failed", 500));
  }
  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
};

const getProductById = async (req, res, next) => {
  const productId = req.params.pid;
  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError("Cant find product", 500);
    return next(error);
  }

  if (!product) {
    const error = new HttpError("Could not find a product by id", 404);
    return next(error);
  }

  res.json({ product: product.toObject({ getters: true }) });
};

const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid input.", 422));
  }
  const { name, description, price, image } = req.body;

  const createdProduct = new Product({
    name,
    description,
    price,
    image,
  });
  try {
    await createdProduct.save();
  } catch (err) {
    const error = new HttpError("Failed creating product", 500);
    return next(error);
  }

  res.status(201).json({ product: createdProduct });
};

const updateProductById = async (req, res, next) => {
  const { name, description, price, image } = req.body;
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError("Could not update product", 500);
    return next(error);
  }
  product.name = name;
  product.description = description;
  product.price = price;
  product.image = image;

  try {
    await product.save();
  } catch (err) {
    const error = new HttpError("Could not update product", 500);
    return next(error);
  }

  res.status(200).json({ product: product.toObject({ getters: true }) });
};

const deleteProductById = async (req, res, next) => {
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError("Could not delete product", 500);
    return next(error);
  }

  try {
    await product.remove();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete product", 500)
    );
  }
  res.status(200).json({ message: "Deleted product." });
};

exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.updateProductById = updateProductById;
exports.deleteProductById = deleteProductById;
