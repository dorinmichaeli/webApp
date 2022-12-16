const express = require("express");

const router = express.Router();

const TEMP_PRODUCT = [
  {
    id: "p1",
    title: "snickers",
    price: "1$",
  },
];

router.get("/:pid", (req, res, next) => {
  const productId = req.params.pid;
  const product = TEMP_PRODUCT.find((p) => {
    return p.id === productId;
  });
  res.json({ product });
});

module.exports = router;
