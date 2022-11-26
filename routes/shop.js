const express = require("express");
const path = require("path");
const shopController = require("../controller/shop");

const router = express.Router();

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct);
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);
router.get("/checkout", shopController.getCheckout);
router.post("/cart-delete-item", shopController.deleteCartItem);

module.exports = router;

// [{"title":"bbbb"},{"title":"Jue"},{"title":"SApa"},{"title":"Yoba"},{"title":"iuqh"}]
