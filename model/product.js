const getDb = require("../util/database").getDb;
const { ObjectId } = require("mongodb");

const getDataProduct = (cb) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) return cb([]);
    if (!data) return cb([]);
    return cb(JSON.parse(data));
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price, userId) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    db.collection("products")
      .insertOne(this)
      .then((succ) => {
        console.log(succ);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static async updateProduct(title, price, description, imageUrl, id) {
    const db = getDb();
    return await db
      .collection("products")
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { title, imageUrl, description, price } }
      );
  }

  static async deleteProduct(id) {
    const db = getDb();
    return db.collection("products").deleteOne({ _id: ObjectId(id) });
  }

  static async fetchProduct() {
    const db = getDb();
    // return await db.collection("products").find({});
    return await db.collection("products").find().toArray();
  }

  static async findProdById(id) {
    const db = getDb();
    return await db
      .collection("products")
      .find({ _id: ObjectId(id) })
      .toArray();
  }
};
