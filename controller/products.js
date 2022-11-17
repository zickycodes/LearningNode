const Product = require("../model/product");
const getProductsPage = (req, res, next) => {
  console.log("In another middleware!");
  res.render("add-product", { pT: "Add Products", path: "admin/add-product" });
};

// let product = [];
// post request
const productsToPage = (req, res, next) => {
  // product.push({ title: req.body.title });
  const product = new Product(req.body.title);
  product.save();
  console.log(req.body.title);
  res.redirect("/");
};

const productsPage = (req, res, next) => {
  // console.log("In another middleware!");
  Product.fetchProduct((prod) => {
    console.log(prod, "here");
    res.render("shop", { prods: prod ? prod : [], pT: "My Shop", path: "/" });
  });
  // res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
};

module.exports = {
  getProductsPage,
  productsToPage,
  productsPage,
};
