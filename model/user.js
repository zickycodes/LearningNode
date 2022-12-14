const getDb = require("../util/database").getDb;
const { ObjectId } = require("mongodb");

module.exports = class User {
  static async findUserId(id) {
    const db = getDb();
    return await db
      .collection("users")
      .find({ _id: ObjectId(id) })
      .toArray();
  }

  static async addToCart(product, user) {
    console.log("pid", ObjectId(product._id).toString());
    const cartProductIndex = user.cart.items.findIndex((cp) => {
      console.log(ObjectId(cp._id).toString() === product._id.toString());
      console.log("cp", ObjectId(cp._id).toString());
      return ObjectId(cp._id).toString() === product._id.toString();
    });

    console.log("cpi", cartProductIndex);
    if (cartProductIndex >= 0) {
      let updatedCart;
      updatedCart = user.cart.items[cartProductIndex];
      updatedCart.quantity++;
      user.cart.items.splice(cartProductIndex, 1, updatedCart);
    } else {
      user.cart.items.push({
        _id: ObjectId(product._id),
        title: product.title,
        quantity: 1,
      });
    }

    const db = getDb();
    return await db
      .collection("users")
      .updateOne({ _id: ObjectId(user._id) }, { $set: { cart: user.cart } });
  }

  static async dispCart() {
    const db = getDb();
    const userCart = await db
      .collection("users")
      .findOne({ _id: ObjectId("639599583240a65e9c6cef48") });
    console.log("us", userCart);
    const cartItems = userCart.cart.items;
    return cartItems;
  }

  static async deleteCart(user, prodId) {
    const db = getDb();
    const cartProductIndex = user.cart.items.findIndex((cp) => {
      console.log(ObjectId(cp._id).toString() === prodId.toString());
      console.log("cp", ObjectId(cp._id).toString());
      return ObjectId(cp._id).toString() === prodId.toString();
    });

    const cartDeleted = user.cart.items[cartProductIndex];
    user.cart.items.splice(cartProductIndex, 1);
    return await db
      .collection("users")
      .updateOne({ _id: ObjectId(user._id) }, { $set: { cart: user.cart } });
  }
};
