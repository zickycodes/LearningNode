// Home page
const Product = require("../model/productseq.js");

exports.getIndex = async (req, res, next) => {
  // Product.fetchProduct()
  //   .then(([rows, fieldData]) => {
  //     res.render("shop/index", {
  //       prods: rows,
  //       pT: "Shop",
  //       path: "/",
  //     });
  //   })
  //   .catch((res) => {
  //     console.log(res);
  //   });
  const products = await Product.findAll();
  res.render("shop/index", {
    prods: products,
    pT: "Shop",
    path: "/",
  });
  console.log(products);
  return products;
};

exports.getProducts = async (req, res, next) => {
  // Product.fetchProduct()
  //   .then(([rows, fieldData]) => {
  //     res.render("shop/product-list", {
  //       prods: rows,
  //       pT: "All Products",
  //       path: "/products",
  //     });
  //   })
  //   .catch((res) => {
  //     console.log(res);
  //   });

  const products = await Product.findAll();
  res.render("shop/product-list", {
    prods: products,
    pT: "Shop",
    path: "/",
  });
  console.log(products);
  return products;
};

exports.getProduct = async (req, res, next) => {
  const prodID = req.params.productId;
  const product = await Product.findAll({
    where: {
      id: prodID,
    },
  });

  res.render("shop/product-detail", {
    product: product[0],
    pT: product.title,
    path: "product/" + prodID,
  });

  console.log(product[0]);
  // res.render("shop/product-detail", {
  //   product: result[0][0],
  //   pT: result[0][0].title,
  //   path: "product/" + prodID,
  // });

  // Product.findProdById(prodID)
  //   .then((result) => {
  //     res.render("shop/product-detail", {
  //       product: result[0][0],
  //       pT: result[0][0].title,
  //       path: "product/" + prodID,
  //     });
  //     console.log(product);
  //   })
  //   .catch((err) => console.log(err));

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
