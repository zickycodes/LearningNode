const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  database: "learning_node",
  password: "zicky",
  port: "3306",
});

module.exports = pool.promise();

// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("learning_node", "root", "zicky", {
//   dialect: "mysql",
//   port: "3306",
//   host: "127.0.0.1",
// });

// module.exports = sequelize;
