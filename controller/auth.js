const User = require("../model/user");

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split("=")[1];
  res.render("auth/login", {
    path: "/login",
    pT: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = async (req, res, next) => {
  const prodId = req.body.productId;
  const user = await User.findUserId("639599583240a65e9c6cef48");
  console.log("fn", user[0]);
  req.session.isLoggedIn = true;
  req.session.user = user[0];
  res.redirect("/");
};

exports.postLogOut = async (req, res, next) => {
  req.session.destroy((e) => {
    res.redirect("/");
  });
};
