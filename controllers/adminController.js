const Item = require("./../models/itemModel");
const History = require("./../models/historyModel");

exports.createOrder = async (req, res, next) => {
  console.log(req.body);
  try {
    const Order = await Item.create(req.body);
    res.status(200).json({
      message: "Message",
      Order,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getOrder = async (req, res, next) => {
  console.log(req.body);
  try {
    const Order = await Item.find();
    res.status(200).json({
      message: "Message",
      Order,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addHistory = async (req, res, next) => {
  try {
    const trackingID = req.body.trackingID;
    const order = await Item.findOne({
      trackingNumber: trackingID,
    });
    if (!order) {
      return next(err);
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
    res.status(200).json({
      message: "success",
      history,
    });
  } catch (err) {
    console.log(err);
  }
};
