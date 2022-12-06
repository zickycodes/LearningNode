// Home page
const Product = require("../model/product");
const Cart = require("../model/cart");
const User = require("../model/user");

exports.getIndex = async (req, res, next) => {
  console.log("fetched");
  const [rows, fieldData] = await Product.fetchProduct();
  res.render("shop/index", {
    prods: rows,
    pT: "Shop",
    path: "/",
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchProduct()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pT: "All Products",
        path: "/products",
      });
    })
    .catch((res) => {
      console.log(res);
    });
};

exports.getProduct = (req, res, next) => {
  const prodID = req.params.productId;
  Product.findProdById(prodID)
    .then((result) => {
      res.render("shop/product-detail", {
        product: result[0][0],
        pT: result[0][0].title,
        path: "product/" + prodID,
      });
    })
    .catch((err) => console.log(err));

  // console.log(prodID);
  // res.redirect("/");
};

exports.getCart = async (req, res, next) => {
  const [row] = await Cart.fetchCount();
  console.log(row);

  res.render("shop/cart", {
    path: "/cart",
    pT: "Your Cart",
    products: row,
  });
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  const [user] = await User.findUserId();
  // Product.findProdById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price, product.title);
  // });
  const [cartId] = await Cart.findUserCartId();
  console.log(cartId);

  if (cartId[0].user_id === user[0].id) {
    await Cart.addCartItem(cartId[0].id, prodId);
  } else {
    await Cart.addToCartTable(user[0].id);
    await Cart.addCartItem(cartId[0].id, prodId);
  }
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
  await Cart.deleteCartItem(prodId);
  res.redirect("/cart");
};

// module.exports = {
//   productsToPage,
//   productsPage,
// };
