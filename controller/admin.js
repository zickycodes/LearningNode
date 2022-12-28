const Product = require("../model/product.js");
const Cart = require("../model/cart");
const User = require("../model/user");

const getAddProductsPage = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split("=")[1];
  // console.log("In another middleware!");
  res.render("admin/edit-product", {
    pT: "Add Products",
    path: "admin/add-product",
    editing: false,
    isAuthenticated: req.session.isLoggedIn ? true : false,
  });
};

// post request
const productsToPage = async (req, res, next) => {
  // This is hard coded
  // const user = await User.findUserId("6394665517596dae29a606f3");
  // console.log(user);
  console.log("tdf", req.session.user);
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    const product = new Product(
      req.body.title,
      req.body.imageUrl,
      req.body.description,
      req.body.price,
      req.session.user._id
    );
    try {
      await product.save();
      res.redirect("/");
    } catch (err) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    }
  }
};

const getEditProductsPage = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  // console.log(editMode);
  const prodId = req.params.productId;
  console.log(prodId);
  try {
    const product = await Product.findProdById(prodId);

    console.log(product);
    res.render("admin/edit-product", {
      pT: "Edit Products",
      path: "admin/edit-product",
      editing: editMode,
      product: product,
      isAuthenticated: req.session.isLoggedIn ? true : false,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }

  // console.log("eg", product[0]);
  // const [userId] = await User.findUserId();
  // console.log(userId[0].id);

  // console.log(prodId);

  // const [product] = await User.findUserProd(prodId, userId[0].id);
  // console.log(product);
};

const postEditProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const productId = req.body.productId;

  // Product.findAll({
  //   where: {
  //     id: productId,
  //   },
  // })
  try {
    const product = await Product.findProdById(productId);
    // console.log("adminprid", product);
    if (product.userId.toString() !== req.session.user._id.toString()) {
      return res.redirect("/admin/products");
    } else {
      try {
        await Product.updateProduct(
          title,
          price,
          description,
          imageUrl,
          productId
        );
        res.redirect("/admin/products");
      } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      }
    }
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

const deleteEditProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const product = await Product.findProdById(prodId);
  if (product.userId.toString() !== req.session.user._id.toString()) {
    return res.redirect("/admin/products");
  } else {
    try {
      await Product.deleteProduct(prodId);
      res.redirect("/admin/products");
    } catch (err) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    }
  }
};

// Home Page
const productsPage = async (req, res, next) => {
  try {
    const products = await Product.fetchUserProduct(req.session.user._id);
    res.render("admin/admin-products", {
      prods: products,
      pT: "My Shop",
      path: "/",
      isAuthenticated: req.session.isLoggedIn ? true : false,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

module.exports = {
  getAddProductsPage,
  productsToPage,
  productsPage,
  getEditProductsPage,
  postEditProduct,
  deleteEditProduct,
};
