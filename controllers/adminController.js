const Item = require("./../models/itemModel");
const History = require("./../models/historyModel");

exports.createOrder = async (req, res, next) => {
  console.log(req.body);
  try {
    const Order = await Item.create(req.body);
    res.redirect("/admin/order");
  } catch (err) {
    console.log(err);
  }
};
exports.editOrder = async (req, res, next) => {
  console.log(req.body);
  try {
    const trackingID = req.params.trackingID;
    const Order = await Item.findOneAndUpdate(
      { trackingNumber: trackingID },
      req.body
    );
    res.redirect("/admin/order");
  } catch (err) {
    console.log(err);
  }
};
exports.getOrder = async (req, res, next) => {
  console.log(req.body);
  try {
    const Order = await Item.find();
    res.render("orders", { layout: "./innerLayouts", orders: Order });
  } catch (err) {
    console.log(err);
  }
};
exports.addHistoryID = async (req, res, next) => {
  try {
    const trackingID = req.params.trackingID;
    res.render("addHistory", { layout: "./innerLayouts", ID: trackingID });
  } catch (err) {
    console.log(err);
  }
};
exports.addOrderID = async (req, res, next) => {
  try {
    const trackingID = req.params.trackingID;
    res.render("editOrder", { layout: "./innerLayouts", ID: trackingID });
  } catch (err) {
    console.log(err);
  }
};

exports.addHistory = async (req, res, next) => {
  try {
    const trackingID = req.params.trackingID;
    const order = await Item.findOne({
      trackingNumber: trackingID,
    });
    if (!order) {
      return next();
    }
    const orderID = order.id;
    const history = await History.create({
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      status: req.body.status,
      updatedBy: req.body.updatedBy,
      remarks: req.body.remarks,
      order: orderID,
    });
    res.redirect("/admin/orders");
  } catch (err) {
    console.log(err);
  }
};

exports.findTrackingInfo = async (req, res, next) => {
  try {
    const info = await Item.findOne({ trackingNumber: req.body.trackingNo });
    console.log(info.id);
    const history = await History.find({ order: info.id });
    console.log(history);
    if (!info) return next();
    res.render("trackingInfo", {
      layout: "./innerLayouts",
      info: info,
      history: history,
    });
  } catch (error) {
    console.log(error);
  }
};
