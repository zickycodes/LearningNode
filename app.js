const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");

const app = express();
// makes it possible to pass html contents from a post request to readable data

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

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404).render("404", { pT: "Page not found", path: "./" });
});

app.listen(3000);
