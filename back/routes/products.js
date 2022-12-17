const express = require("express");
const { check } = require("express-validator");
const productsController = require("../controllers/productsController");

const router = express.Router();

router.get("/", productsController.getAllProducts);

router.get("/:pid", productsController.getProductById);

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("price").not().isEmpty(),
    check("image").not().isEmpty(),
  ],
  productsController.createProduct
);

router.patch("/:pid", productsController.updateProductById);

router.delete("/:pid", productsController.deleteProductById);

module.exports = router;
