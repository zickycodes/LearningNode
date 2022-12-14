// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "127.0.0.1",
//   user: "root",
//   database: "learning_node",
//   password: "zicky",
//   port: "3306",
// });

// module.exports = pool.promise();

const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;

let _db;

const mongoConnect = (callback) => {
  mongoClient
    .connect(
      "mongodb+srv://Zicky:111Universityof222!@cluster0.caqqaet.mongodb.net/?retryWrites=true&w=majority"
    )
    .then((client) => {
      console.log("Connected!");
      _db = client.db("shop");
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

module.exports = {
  mongoConnect,
  getDb,
};
