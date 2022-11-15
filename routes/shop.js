const express = require("express");
const path = require("path");
const { product } = require("./admin");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("In another middleware!");
  // res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
  res.render("shop", { prods: product, pT: "My Shop", path: "/" });
});

module.exports = router;
