const path = require("path");
const fs = require("fs");
// const { deleteProduct } = require("./product");

const dataPath = path.join(__dirname, "..", "data", "cart.json");

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
  // fetch the cart product
  static addProduct(id, price, title) {
    getCartItems((cart) => {
      // check the existing array of items for the existing product
      const existingProductIndex = cart.product.findIndex((prod) => {
        return prod.id === id;
      });
      const existingProduct = cart.product[existingProductIndex];
      console.log(existingProduct);
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        // update qty of items ordered if demanded
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.product.splice(existingProductIndex, 1, updatedProduct);
      } else {
        // if no existing product
        updatedProduct = { id: id, qty: 1, title: title };
        cart.product.push(updatedProduct);
      }

      // cart.product.push(updatedProduct);
      // cart.product = [cart.product, ...upd];
      // cart.product[existingProductIndex] = updatedProduct;
      cart.amount = cart.amount + +price;
      console.log(JSON.stringify(cart));

      fs.writeFile(dataPath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

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
    getCartItems(cb);
  }
};
// {"product":[{"id":"32424","qty":7},{"id":"0.5871752302877347","qty":2}],"amount":418}
