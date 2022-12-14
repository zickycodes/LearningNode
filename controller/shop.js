// Home page
const Product = require("../model/product");
const Cart = require("../model/cart");
const User = require("../model/user");
const { ProfilingLevel } = require("mongodb");

exports.getIndex = async (req, res, next) => {
  console.log("fetched");
  const products = await Product.fetchProduct();
  // console.log(products);
  res.render("shop/index", {
    prods: products,
    pT: "Shop",
    path: "/",
  });
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.fetchProduct();

  res.render("shop/product-list", {
    prods: products,
    pT: "All Products",
    path: "/products",
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
  console.log(prodID);

  const product = await Product.findProdById(prodID);
  console.log("jwf", product[0]);

  res.render("shop/product-detail", {
    product: product[0],
    pT: product[0].title,
    path: "product/" + prodID,
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
  console.log(cartItems);

  res.render("shop/cart", {
    path: "/cart",
    pT: "Your Cart",
    products: cartItems,
  });
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  const user = await User.findUserId("639599583240a65e9c6cef48");
  const product = await Product.findProdById(prodId);
  console.log(product);
  console.log(user[0]);
  await User.addToCart(product[0], user[0]);

  res.redirect("/cart");
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.deleteCartItem = async (req, res, next) => {
  const prodId = req.body.productId;
  const user = await User.findUserId("639599583240a65e9c6cef48");
  await User.deleteCart(user[0], prodId);

  res.redirect("/cart");
};

// module.exports = {
//   productsToPage,
//   productsPage,
// };
