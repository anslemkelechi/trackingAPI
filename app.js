const path = require("path");
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const adminRoute = require("./routes/adminRoute");
const homeRoute = require("./routes/homeRoute");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");

//VIEWS
app.use(express.static("public"));
app.use(expressLayouts);
app.set("layout", "./layouts");
app.set("view engine", "ejs");

//ACCEPT FORM BODY
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Express Session
const sessionConfig = {
  secret: "keyboardcat",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
};

// Use MongoDB store in production, memory store in development
if (process.env.NODE_ENV === "production") {
  sessionConfig.store = MongoStore({
    mongoUrl: process.env.DATABASE_PROD.replace(
      "<password>",
      process.env.DATABASE_PASSWORD,
    ),
  });
  sessionConfig.cookie.secure = true; // https only in production
}

app.use(session(sessionConfig));

//Connect flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Rouutes
app.use("/", homeRoute);
app.use("/admin", adminRoute);
app.use("/tracking", adminRoute);

module.exports = app;
