const express = require("express");
const path = require("path");
const adminController = require("../controller/admin.js");
const shopController = require("../controller/shop.js");
const router = express.Router();

// get request
router.get("/add-product", adminController.getAddProductsPage);

// post request
router.post("/add-product", adminController.productsToPage);

// /admin/products => GET
router.get("/products", adminController.productsPage);

router.get("/edit-product/:productId", adminController.getEditProductsPage);
// router.get("/edit-product", adminController.getEditProductsPage);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product/:productId", adminController.deleteEditProduct);

module.exports = {
  routes: router,
};
