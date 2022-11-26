const Product = require("../model/product");
const Cart = require("../model/cart");

// Home page

exports.getIndex = (req, res, next) => {
  Product.fetchProduct((products) => {
    res.render("shop/index", {
      prods: products ? products : [],
      pT: "Shop",
      path: "/",
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchProduct((products) => {
    res.render("shop/product-list", {
      prods: products,
      pT: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodID = req.params.productId;
  Product.findProdById(prodID, (product) => {
    res.render("shop/product-detail", {
      product,
      pT: product.title,
      path: "product/" + prodID,
    });
    // console.log(prod);
  });

  // console.log(prodID);
  // res.redirect("/");
};

exports.getCart = (req, res, next) => {
  Cart.fetchCart((cartProduct) => {
    // cartProds = [];
    // for(prod of cartProduct.product) {
    //   Product.findProdById(prod.id, (product)=> {
    //     cartProds.push(product)
    //   })
    // }
    res.render("shop/cart", {
      path: "/cart",
      pT: "Your Cart",
      products: cartProduct,
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findProdById(prodId, (product) => {
    Cart.addProduct(prodId, product.price, product.title);
  });
  res.redirect("/cart");
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.deleteCartItem = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findProdById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

// module.exports = {
//   productsToPage,
//   productsPage,
// };
