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
  constructor(prodId, title, imageUrl, description, price, userId) {
    this.id = prodId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.userId = userId;
  }

  async save() {
    const [rows, fields] = await db.query('SHOW TABLES LIKE "products"');
    console.log("fe", rows);
    if (rows) {
      return await db.execute(
        "INSERT INTO products(title, price, description, imageUrl, user_id ) VALUES(?, ?, ?, ?, ?)",
        [this.title, this.price, this.description, this.imageUrl, this.userId]
      );
    }
  }

  static async updateProduct(title, price, description, imageUrl, id) {
    return await db.execute(
      "UPDATE products SET title = ?, price = ?, description = ?, imageUrl = ? WHERE id = ?",
      [title, price, description, imageUrl, id]
    );
  }

  static async deleteProduct(id) {
    // getDataProduct((products) => {
    //   const deleteProductIndex = products.findIndex((prod) => (prod.id = id));
    //   products.splice(products[deleteProductIndex], 1);
    //   fs.writeFile(dataPath, JSON.stringify(products), (err) => {
    //     console.log(err);
    //   });
    // });
    return await db.execute("DELETE FROM products WHERE id = ?", [id]);
  }

  static async fetchProduct() {
    return await db.execute("SELECT * FROM products");
  }

  static findProdById(id) {
    return db.execute("SELECT * FROM products WHERE id = (?)", [id]);
  }
};
