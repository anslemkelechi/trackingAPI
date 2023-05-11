const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your Nft Must Have A Name"],
  },
  price: {
    type: Number,
    required: [true, "Your Nft Must Have A Price"],
  },
  description: {
    type: String,
    required: [true, "Your Nft Must Have A Description"],
  },
  status: {
    type: String,
    default: "pending",
  },
  media_url: {
    type: String,
    required: [true, "Your Nft Must Have A Media File"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

itemSchema.pre("save", function (next) {
  this.populate({
    path: "user",
    select: "-__v -resetPasswordToken -resetTokenExpires -password -email",
  });
  next();
});

const NFT = mongoose.model("NFT", itemSchema);
module.exports = NFT;
