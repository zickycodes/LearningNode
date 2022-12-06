const Product = require("../model/product.js");
const Cart = require("../model/cart");
const User = require("../model/user");

const getAddProductsPage = (req, res, next) => {
  console.log("In another middleware!");
  res.render("admin/edit-product", {
    pT: "Add Products",
    path: "admin/add-product",
    editing: false,
  });
};

// post request
const productsToPage = async (req, res, next) => {
  // This is hard coded
  const [user] = await User.findUserId();
  console.log(user[0]);

  const product = new Product(
    null,
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price,
    user[0].id
  );
  await product.save();
  res.redirect("/");
};

const getEditProductsPage = async (req, res, next) => {
  console.log("In another middleware!");
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  console.log(editMode);
  const prodId = req.params.productId;
  const [userId] = await User.findUserId();
  console.log(userId[0].id);

  console.log(prodId);

  const [product] = await User.findUserProd(prodId, userId[0].id);
  console.log(product);

  res.render("admin/edit-product", {
    pT: "Edit Products",
    path: "admin/edit-product",
    editing: editMode,
    product: product[0],
  });
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

  await Product.updateProduct(title, price, description, imageUrl, productId);
  res.redirect("/admin/products");
};

const deleteEditProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  await Product.deleteProduct(prodId);
  // Product.findProdById(prodId, (product) => {
  //   Cart.deleteProduct(prodId, product.price);
  // });

  res.redirect("/admin/products");
};

// Home Page
const productsPage = async (req, res, next) => {
  const [products, fieldData] = await Product.fetchProduct();
  res.render("admin/admin-products", {
    prods: products,
    pT: "My Shop",
    path: "/",
  });
};

module.exports = {
  getAddProductsPage,
  productsToPage,
  productsPage,
  getEditProductsPage,
  postEditProduct,
  deleteEditProduct,
};
