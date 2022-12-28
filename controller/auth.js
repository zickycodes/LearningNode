const User = require("../model/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { validationResult } = require("express-validator");

const transporter = nodemailer.createTransport(
  // sendgridTransport({
  //   auth: {
  //     api_key:
  //       "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",
  //   },
  // })
  {
    service: "gmail",
    auth: {
      user: "godsgiftuduak2@gmail.com",
      pass: "wjhrslegsmemuamz",
    },
  }
);

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split("=")[1];
  // Here we do not expect that there should be any data that comes along side with the flashed error
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pT: "Login",
    errorMessage: message,
    oldInput: {
      email: "",
      password: "",
    },
    validationErrors: [],
  });
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  try {
    const user = await User.findUserByEmail(email);
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }

  const doMatch = await bcrypt.compare(
    password,
    user ? user.password : `${Math.random()}`
  );

  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      path: "/login",
      pT: "Login",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }

  if (doMatch) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    // The flash error is used mainly when redirecting to page that should contain the flashed data.
    // req.flash("error", "Invalid email or password");
    // return res.redirect("/login");
    return res.status(422).render("auth/login", {
      path: "/login",
      pT: "Login",
      errorMessage: "Invalid email or password.",
      oldInput: {
        email: email,
        password: password,
      },
      validationErrors: [],
    });
  }
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pT: "Signup",
    errorMessage: message,
    oldInput: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationErrors: [],
  });
};

exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const errors = validationResult(req);

  const user = await User.findUserByEmail(email);
  const hashedPassword = await bcrypt.hash(password, 12);

  if (!errors.isEmpty()) {
    // console.log(errors.array());
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pT: "Signup",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      },
      validationErrors: errors.array(),
    });
  }

  if (user) {
    console.log("user found");
    // The flash error is used mainly when redirecting to page that should contain the flashed data.
    // req.flash("error", "Email already exists");
    // return res.redirect("/login");
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pT: "Signup",
      // takes the first element in the form that produces an error and passes it to the array
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      },
      validationErrors: errors.array(),
    });
  } else {
    try {
      await User.save({
        email: email,
        password: hashedPassword,
        cart: { items: [] },
        resetToken: null,
        resetTokenExpire: null,
      });
      // await transporter.sendMail(
      //   {
      //     to: email,
      //     from: "godsgiftuduak2@gmail.com",
      //     subject: "Signup succeeded!",
      //     html: "<h1>You successfully signed up!</h1>",
      //   },
      //   (err) => {
      //     console.log(err);
      //   }
      // );
      console.log("user added");
      return res.redirect("/login");
    } catch (err) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    }
  }
};

exports.postLogOut = async (req, res, next) => {
  // used to destroy a session
  req.session.destroy((e) => {
    res.redirect("/");
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    pT: "Reset Password",
    errorMessage: message,
  });
};

exports.postReset = async (req, res, next) => {
  crypto.randomBytes(32, async (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    try {
      const user = await User.findUserByEmail({ email: req.body.email });
    } catch (err) {
      const error = new Error(err);
      error.httpStatusCode = 500;
    }

    if (!user) {
      req.flash("error", "No account with that email found.");
      return res.redirect("/reset");
    } else {
      await User.upddateUserToken({
        email: req.body.email,
        resetToken: token,
        resetTokenExpire: Date.now() + 3600000,
      });
      transporter
        .sendMail({
          to: req.body.email,
          from: "godsgiftuduak2@gmail.com",
          subject: "Password reset",
          html: `
          <p>You requested a password reset</p>
          <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
        `,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
      return res.redirect("/");
    }
  });
};

exports.getNewPassword = async (req, res, next) => {
  const token = req.params.token;
  console.log(token);
  const user = await User.findByToken({ resetToken: token });
  console.log("user", user);
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  return res.render("auth/new-password", {
    path: "/new-password",
    pT: "New Password",
    errorMessage: message,
    userId: user._id.toString(),
    passwordToken: token,
  });
};

exports.postNewPassword = async (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  // let resetUser;
  console.log(passwordToken);
  try {
    const user = await User.findByToken({
      resetToken: passwordToken,
      // resetTokenExpiration: { $gt: Date.now() },
      // _id: userId
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }

  console.log("user p", user);
  if (user) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await User.updateUserPassword(hashedPassword, user.email);
      res.redirect("/login");
    } catch (err) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    }
  }
};

// The last error flashed on to the user is the error that to

//     .then((user) => {
//       resetUser = user;
//       return bcrypt.hash(newPassword, 12);
//     })
//     .then((hashedPassword) => {
//       // resetUser.password = hashedPassword;
//       // resetUser.resetToken = undefined;
//       // resetUser.resetTokenExpiration = undefined;
//       // return resetUser.save();
//       return User.updateUserPassword(hashedPassword, user.email);
//     })
//     .then((result) => {
//       res.redirect("/login");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
