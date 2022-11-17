const express = require("express");
const path = require("path");
const productsController = require("../controller/products");

const router = express.Router();

router.get("/", productsController.productsPage);

module.exports = router;
