const express = require("express");
const path = require("path");
const shopController = require("../controller/shop");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct);
router.get("/cart", isAuth, shopController.getCart);
router.post("/cart", isAuth, shopController.postCart);
router.get("/checkout", isAuth, shopController.getCheckout);
router.post("/cart-delete-item", isAuth, shopController.deleteCartItem);

module.exports = router;

// [{"title":"bbbb"},{"title":"Jue"},{"title":"SApa"},{"title":"Yoba"},{"title":"iuqh"}]
