const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    trackingNumber: {
      type: String,
    },
    senderName: {
      type: String,
      required: [true, "Please input sender name"],
    },
    senderAddress: {
      type: String,
      required: [true, "Please input sender address"],
    },
    senderEmail: {
      type: String,
      required: [true, "Please input sender email address"],
    },
    recieverName: {
      type: String,
      required: [true, "Please input reciever name"],
    },
    recieverAddress: {
      type: String,
      required: [true, "Please input reciever address"],
    },
    recieverEmail: {
      type: String,
      required: [true, "Please input reciever email address"],
    },
    recieverPhone: {
      type: String,
      required: [true, "Please input reciever phone number"],
    },
    status: {
      type: String,
      default: "Initaited",
    },
    shipmentOrigin: {
      type: String,
    },
    shipmentPackage: {
      type: String,
    },
    shipmentDestination: {
      type: String,
    },
    shipmentCarrier: {
      type: String,
    },
    shipmentType: {
      type: String,
    },
    shipmentWeight: {
      type: String,
    },
    shipmentMode: {
      type: String,
    },
    shipmentRefNo: {
      type: String,
    },
    shipmentProduct: {
      type: String,
    },
    shipmentQuantity: {
      type: String,
    },
    shipmentPaymentMode: {
      type: String,
    },
    shipmentDeliveryDate: {
      type: String,
    },
    shipmentDapatureTime: {
      type: String,
    },
    shipmentPickupDate: {
      type: String,
    },
    shipmentPickupTime: {
      type: String,
    },
    comments: {
      type: String,
    },
    map: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
itemSchema.pre("save", function (next) {
  this.trackingNumber = `OCN-${Math.floor(Math.random() * 9999999)}`;
  next();
});

itemSchema.virtual("history", {
  ref: "History",
  foreignField: "order",
  localField: "_id",
});
const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
