const db = require("../util/database");

module.exports = class User {
  static async findUserId() {
    return await db.execute("SELECT * FROM Users WHERE id = ?", [1]);
  }

  static async findUserProd(prodId, userId) {
    // select first_name,last_name,sum(amount) from customers left join orders on customers.id = orders.customer_id
    return await db.execute(
      "SELECT title, price, description, imageUrl FROM Users LEFT JOIN products ON Users.id = products.user_id where products.id = ? AND products.user_id = ?",
      [prodId, userId]
    );
  }
};
