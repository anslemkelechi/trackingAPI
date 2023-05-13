const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    location: {
      type: String,
    },
    status: {
      type: String,
    },
    updatedBy: {
      type: String,
    },
    remarks: {
      type: String,
    },
    order: {
      type: String,
      ref: "Item",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const History = mongoose.model("History", historySchema);
module.exports = History;
