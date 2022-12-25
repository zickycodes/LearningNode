const express = require("express");
const path = require("path");
const adminController = require("../controller/admin.js");
const shopController = require("../controller/shop.js");
const router = express.Router();
const isAuth = require("../middleware/is-auth");

// get request
router.get("/add-product", isAuth, adminController.getAddProductsPage);

// post request
router.post("/add-product", isAuth, adminController.productsToPage);

// /admin/products => GET
router.get("/products", isAuth, adminController.productsPage);

router.get(
  "/edit-product/:productId",
  isAuth,
  adminController.getEditProductsPage
);
// router.get("/edit-product", adminController.getEditProductsPage);

router.post("/edit-product", isAuth, adminController.postEditProduct);

router.post(
  "/delete-product/:productId",
  isAuth,
  adminController.deleteEditProduct
);

module.exports = {
  routes: router,
};
