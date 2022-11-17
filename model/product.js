const path = require("path");
const fs = require("fs");
// const e = require("express");
// const { json } = require("body-parser");

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    const dataPath = path.join(__dirname, "..", "data", "products.json");
    fs.readFile(dataPath, (err, dataContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(dataContent);
      }
      products.push(this);
      fs.writeFile(dataPath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
    console.log(dataPath);
  }

  static fetchProduct(cb) {
    const dataPath = path.join(__dirname, "..", "data", "products.json");
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) return cb([]);
      // if (!data) return cb([]);
      return cb(JSON.parse(data));
    });
  }
};
