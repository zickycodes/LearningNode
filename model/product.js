const db = require("../util/database");
// const e = require("express");
// const { json } = require("body-parser");

// const dataPath = path.join(__dirname, "..", "data", "products.json");

const getDataProduct = (cb) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) return cb([]);
    if (!data) return cb([]);
    return cb(JSON.parse(data));
  });
};

module.exports = class Product {
  constructor(prodId, title, imageUrl, description, price) {
    this.id = prodId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    // this.id = Math.random().toString();
  }

  // check if an id exist when function is called. If it is, take the id and replace its item with the updated, else create a new one and save it
  save() {
    return db.execute(
      "INSERT INTO products(title, price, description, imageUrl) VALUES(?, ?, ?, ?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  updateProduct() {
    // fetch all products
    // take out the updated prod
    // pass into a new object
    // push to the product list
    getDataProduct((products) => {
      const updatedProductsIndex = products.findIndex(
        (prod) => prod.id === this.id
      );
      products.splice(products[updatedProductsIndex], 1, this);
      fs.writeFile(dataPath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id) {
    getDataProduct((products) => {
      const deleteProductIndex = products.findIndex((prod) => (prod.id = id));
      products.splice(products[deleteProductIndex], 1);
      fs.writeFile(dataPath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchProduct() {
    return db.execute("SELECT * FROM products");
  }

  // static findProdById(id, cb) {
  //
  //   const prod = getDataProduct((products) => {
  //     console.log(products);
  //     return products.find((prod) => prod.id === id);
  //   });
  //   console.log(prod);
  //   return cb(prod);
  // }

  static findProdById(id) {
    return db.execute("SELECT * FROM products WHERE id = (?)", [id]);
  }
};
