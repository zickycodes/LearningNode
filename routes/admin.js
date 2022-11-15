const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/add-product", (req, res, next) => {
  console.log("In another middleware!");
  //   res.send(
  //     '<form action = "admin/product" method="POST"><input type="text" name="title"><button type="submit">Add Products</button></form>'
  //   );

  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));

  res.render("add-product", { pT: "Add Products", path: "admin/add-product" });
});

const product = [];
router.post("/product", (req, res, next) => {
  product.push({ title: req.body.title });

  console.log(req.body.title);
  res.redirect("/");
});

// exports.routes = router;
// exports.products = product;

module.exports = {
  routes: router,
  product: product,
};
