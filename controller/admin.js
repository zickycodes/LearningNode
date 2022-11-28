const Product = require("../model/product");
const Cart = require("../model/cart");

const getAddProductsPage = (req, res, next) => {
  console.log("In another middleware!");
  res.render("admin/edit-product", {
    pT: "Add Products",
    path: "admin/add-product",
    editing: false,
  });
};

// post request
const productsToPage = (req, res, next) => {
  // product.push({ title: req.body.title });
  const product = new Product(
    null,
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
  );
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(req.body.title);
};

const getEditProductsPage = (req, res, next) => {
  console.log("In another middleware!");
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  console.log(editMode);
  const prodId = req.params.productId;

  console.log(prodId);

  Product.findProdById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pT: "Edit Products",
      path: "admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

const postEditProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const productId = req.body.productId;

  const updatedProduct = new Product(
    productId,
    title,
    imageUrl,
    description,
    price
  );
  updatedProduct.updateProduct();
  res.redirect("/admin/products");
};

const deleteEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.deleteProduct(prodId);
  Product.findProdById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
  });

  res.redirect("/admin/products");
};

// Home Page
const productsPage = (req, res, next) => {
  // console.log("In another middleware!");
  Product.fetchProduct((prod) => {
    console.log(prod, "here");
    res.render("admin/admin-products", {
      prods: prod ? prod : [],
      pT: "My Shop",
      path: "/",
    });
  });
  // res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
};

module.exports = {
  getAddProductsPage,
  productsToPage,
  productsPage,
  getEditProductsPage,
  postEditProduct,
  deleteEditProduct,
};
