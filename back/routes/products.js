const express = require("express");
const { check } = require("express-validator");
const productsController = require("../controllers/productsController");

const router = express.Router();

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

router.patch("/:pid", productsController.updateProduct);

router.delete("/:pid", productsController.deleteProduct);

module.exports = router;
