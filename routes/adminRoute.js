const express = require("express");
const Router = express.Router();
const adminController = require("./../controllers/adminController");

Router.get("/new-order", (req, res) => {
  res.render("newOrder", { layout: "./innerLayouts" });
});
Router.get("/order", adminController.getOrder);
Router.post("/new-order", adminController.createOrder);
Router.post("/addhistory", adminController.addHistory);
Router.get("/orders", adminController.getOrder);
module.exports = Router;
