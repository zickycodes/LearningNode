// const db = require("../util/database");

// const dataPath = path.join(__dirname, "..", "data", "cart.json");
const db = require("../util/database");

const getCartItems = (cb) => {
  fs.readFile(dataPath, "utf8", (err, dataContent) => {
    let cart;
    if (!dataContent) {
      // cart = { product: [], amount: 0 };
      cb({ product: [], amount: 0 });
    }
    if (dataContent) {
      // cart = JSON.parse(dataContent);
      cb(JSON.parse(dataContent));
      console.log("hsf", dataContent);
    }
  });
};

module.exports = class Product {
  static async addToCartTable(user_id) {
    return db.execute("INSERT INTO cart (user_id) values(?)", [user_id]);
  }

  static async findUserCartId() {
    // user id should be passed to this function.
    return db.execute("SELECT id, user_id FROM cart WHERE user_id = ?", [1]);
  }

  static async addCartItem(cart_id, product_id) {
    return db.execute(
      "INSERT INTO cartItem(quantity, cart_id, product_id ) VALUES(?, ?, ?)",
      [1, cart_id, product_id]
    );
  }

  static async fetchCount() {
    return db.execute(
      "select sum(quantity) as count, title, product_id as id from cart left join cartItem on cart.id = cartItem.cart_id left join products on products.id = cartItem.product_id group by product_id"
    );
  }

  static async deleteCartItem(id) {
    return db.execute("delete from cartItem where product_id = ?", [id]);
  }

  // fetch the cart product
  // static addProduct(id, price, title) {
  //   getCartItems((cart) => {
  //     // check the existing array of items for the existing product
  //     const existingProductIndex = cart.product.findIndex((prod) => {
  //       return prod.id === id;
  //     });
  //     const existingProduct = cart.product[existingProductIndex];
  //     console.log(existingProduct);
  //     let updatedProduct;
  //     if (existingProduct) {
  //       updatedProduct = { ...existingProduct };
  //       // update qty of items ordered if demanded
  //       updatedProduct.qty = updatedProduct.qty + 1;
  //       cart.product.splice(existingProductIndex, 1, updatedProduct);
  //     } else {
  //       // if no existing product
  //       updatedProduct = { id: id, qty: 1, title: title };
  //       cart.product.push(updatedProduct);
  //     }

  //     // cart.product.push(updatedProduct);
  //     // cart.product = [cart.product, ...upd];
  //     // cart.product[existingProductIndex] = updatedProduct;
  //     cart.amount = cart.amount + +price;
  //     console.log(JSON.stringify(cart));

  //     fs.writeFile(dataPath, JSON.stringify(cart), (err) => {
  //       console.log(err);
  //     });
  //   });
  // }

  // update the (qty, price)cart if there is an existing product in the cart
  // else add a new item to the cart

  static deleteProduct(id, price) {
    getCartItems((cart) => {
      const deleteProductIndex = cart.product.findIndex(
        (prod) => (prod.id = id)
      );
      const deletedProduct = cart.product[deleteProductIndex];
      cart.product.splice(cart.product[deleteProductIndex], 1);
      cart.amount = cart.amount - deletedProduct.qty * price;

      fs.writeFile(dataPath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static fetchCart(cb) {
    db.execute(
      "SELECT COUNT(*) FROM cart LEFT JOIN cartItem ON products.id = cartItem.product_id"
    );
  }
};
// {"product":[{"id":"32424","qty":7},{"id":"0.5871752302877347","qty":2}],"amount":418}
