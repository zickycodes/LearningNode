const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");

const app = express();
// makes it possible to pass html contents to readable data
app.use(bodyParser.urlencoded({ extended: false }));
// make it possible to reas static ddata
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   console.log('In the middleware!');
//   next(); // Allows the request to continue to the next middleware in line
// });

// app.use((req, res, next) => {
//   console.log('In another middleware!');
//   res.send('<h1>Hello from Express!</h1>');
// });

// app.listen(3000);

app.use("/admin", adminRoutes);

app.use(shopRoute);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
