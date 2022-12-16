const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");
const authRoute = require("./routes/auth");
const error = require("./controller/error");
const app = express();
const mongoConnect = require("./util/database").mongoConnect;
const sessions = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(sessions);
const User = require("./model/user");

// makes it possible to pass html contents from a post request to readable data
app.use(bodyParser.urlencoded({ extended: false }));

const MONGODB_URI =
  "mongodb+srv://Zicky:111Universityof222!@cluster0.caqqaet.mongodb.net/shop";

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

// parse application/json
app.use(bodyParser.json());

// make it possible to read static data
app.use(express.static(path.join(__dirname, "public")));

// makes it possible to configure the cookies that is stored with the session id
app.use(
  sessions({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Helpful when working with templating engines like pug, ejs
// app.set("view engine", "pug");
app.set("view engine", "ejs");

// used tp highlight the directory of the templating engine file
app.set("views", "views");

app.use("/admin", adminRoutes.routes);

// app.use((req, res, next) => {
//   if (!req.session.user) {
//     return next();
//   }

//   User.findUserId(req.session.user._id)
//     .then((user) => {
//       console.log("rtr", user[0]);
//       req.user = user[0];
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use(authRoute);

app.use(shopRoute);

app.use(error);

mongoConnect(() => {
  app.listen(3000, () => console.log("ready"));
});
