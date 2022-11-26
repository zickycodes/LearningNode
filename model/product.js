const path = require("path");
const fs = require("fs");
// const e = require("express");
// const { json } = require("body-parser");

const dataPath = path.join(__dirname, "..", "data", "products.json");

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
    // this.id = Math.random().toString()
    // const dataPath = path.join(__dirname, "..", "data", "products.json");
    // fs.readFile(dataPath, (err, dataContent) => {
    //   let products = [];
    //   if (!err) {
    //     products = JSON.parse(dataContent);
    //   }
    //   products.push(this);
    //   fs.writeFile(dataPath, JSON.stringify(products), (err) => {
    //     console.log(err);
    //   });
    // });
    // console.log(dataPath);
    this.id = Math.random().toString();
    getDataProduct((products) => {
      products.push(this);
      fs.writeFile(dataPath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
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

  static fetchProduct(cb) {
    getDataProduct(cb);
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

  static findProdById(id, cb) {
    getDataProduct((products) => {
      const prod = products.find((prod) => prod.id === id);
      // console.log(prod);
      cb(prod);
    });
  }
};
