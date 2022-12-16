const express = require("express");
const productsController = require("../controllers/productsController");

const router = express.Router();

router.get("/:pid", productsController.getProductById);
router.post("/", productsController.creatProduct);

router.patch("/:pid", productsController.updateProduct);

router.delete("/:pid", productsController.deleteProduct);

module.exports = router;
