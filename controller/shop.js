// Home page
const Product = require("../model/product");
const Cart = require("../model/cart");
const User = require("../model/user");
const { ProfilingLevel } = require("mongodb");

exports.getIndex = async (req, res, next) => {
  console.log("fetched");
  // const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1];
  // const isLoggedIn = req.get("Cookie").split("=")[1];
  // console.log("fg", isLoggedIn);
  const products = await Product.fetchProduct();
  // console.log(products);
  res.render("shop/index", {
    prods: products,
    pT: "Shop",
    path: "/",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.fetchProduct();
  // const isLoggedIn = req.get("Cookie").split("=")[1];
  // console.log("fgi", isLoggedIn);
  console.log("pr", products);
  res.render("shop/product-list", {
    prods: products,
    pT: "All Products",
    path: "/products",
    isAuthenticated: req.session.isLoggedIn,
  });

  // Product.fetchProduct()
  //   .then(([rows,  => {
  //  ;
  //   })
  //   .catch((res) => {
  //     console.log(res);
  //   });
};

exports.getProduct = async (req, res, next) => {
  const prodID = req.params.productId;
  // const isLoggedIn = req.get("Cookie").split("=")[1];
  const product = await Product.findProdById(prodID);
  let loggedIn = req.session.isLoggedIn;
  console.log("running");
  // return res.redirect("/");

  // return res.render("shop/product-detail", {
  //   product: product,
  //   pT: product.title,
  //   path: "product/" + prodID,
  // });
  return res.render("shop/product-detail", {
    path: "product/" + prodID,
    product: product,
    pT: "title",
    isAuthenticated: false,
  });

  // Product.findProdById(prodID)
  //   .then((product) => {
  //     console.log(product);

  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.getCart = async (req, res, next) => {
  const cartItems = await User.dispCart();
  // const isLoggedIn = req.get("Cookie").split("=")[1];
  console.log(cartItems);

  res.render("shop/cart", {
    path: "/cart",
    pT: "Your Cart",
    products: cartItems,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  // const user = await User.findUserId("639599583240a65e9c6cef48");
  const product = await Product.findProdById(prodId);
  console.log("product", product);
  console.log(req.user);
  await User.addToCart(product, req.session.user);

  res.redirect("/cart");
};

exports.getCheckout = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split("=")[1];
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
    // isAuthenticated: isLoggedIn,
  });
};

exports.deleteCartItem = async (req, res, next) => {
  const prodId = req.body.productId;
  // const user = await User.findUserId("639599583240a65e9c6cef48");
  await User.deleteCart(req.session.user, prodId);

  res.redirect("/cart");
};

// module.exports = {
//   productsToPage,
//   productsPage,
// };
