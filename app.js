const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");
const error = require("./controller/error");

const app = express();
// makes it possible to pass html contents from a post request to readable data

// parse application/json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// make it possible to read static data
app.use(express.static(path.join(__dirname, "public")));

// Helpful when working with templating engines like pug, ejs
// app.set("view engine", "pug");
app.set("view engine", "ejs");

// used tp highlight the directory of the templating engine file
app.set("views", "views");

app.use("/admin", adminRoutes.routes);

app.use(shopRoute);

app.use(error);

app.listen(3000, () => console.log("ready"));
