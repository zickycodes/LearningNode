const Product = require("../model/productseq.js");
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
const productsToPage = async (req, res, next) => {
  // product.push({ title: req.body.title });
  // const product = new Product(
  //   null,
  //   req.body.title,
  //   req.body.imageUrl,
  //   req.body.description,
  //   req.body.price
  // );
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  const firstInstance = await Product.create({
    title: req.body.title,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
  });

  res.redirect("/");

  console.log(firstInstance);
  return firstInstance;
};

const getEditProductsPage = async (req, res, next) => {
  console.log("In another middleware!");
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  console.log(editMode);
  const prodId = req.params.productId;

  console.log(prodId);

  const product = await Product.findAll({
    where: {
      id: prodId,
    },
  });

  res.render("admin/edit-product", {
    pT: "Edit Products",
    path: "admin/edit-product",
    editing: editMode,
    product: product[0],
  });
};

const postEditProduct = async (req, res, next) => {
  // const title = req.body.title;
  // const imageUrl = req.body.imageUrl;
  // const price = req.body.price;
  // const description = req.body.description;
  const productId = req.body.productId;

  // Product.findAll({
  //   where: {
  //     id: productId,
  //   },
  // })

  await Product.update(
    {
      title: req.body.title,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
    },
    {
      where: {
        id: productId,
      },
    }
  );

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
const productsPage = async (req, res, next) => {
  // console.log("In another middleware!");
  // Product.fetchProduct((prod) => {
  //   console.log(prod, "here");
  //   res.render("admin/admin-products", {
  //     prods: prod ? prod : [],
  //     pT: "My Shop",
  //     path: "/",
  //   });
  // });

  const products = await Product.findAll();
  res.render("admin/admin-products", {
    prods: products,
    pT: "My Shop",
    path: "/",
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
