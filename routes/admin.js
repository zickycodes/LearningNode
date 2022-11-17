const express = require("express");
const path = require("path");
const productsController = require("../controller/products");
const router = express.Router();

router.get("/add-product", productsController.getProductsPage);
router.post("/product", productsController.productsToPage);

module.exports = {
  routes: router,
};
