const express = require("express");
const Router = express.Router();
const adminController = require("./../controllers/adminController");

Router.get("/new-order", (req, res) => {
  res.render("newOrder", { layout: "./innerLayouts" });
});
Router.get("/edit-order/:trackingID", adminController.addOrderID);
Router.get("/order", adminController.getOrder);
Router.post("/new-order", adminController.createOrder);
Router.post("/edit-order/:trackingID", adminController.editOrder);
Router.get("/addhistory/:trackingID", adminController.addHistoryID);
Router.post("/addhistory/:trackingID", adminController.addHistory);
Router.get("/orders", adminController.getOrder);

//Tracking Info
Router.post("/info", adminController.findTrackingInfo);
module.exports = Router;
