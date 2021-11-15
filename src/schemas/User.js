  const { Schema, model } = require("mongoose");
module.exports = model(
  "User",
  new Schema({
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      default: 0
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    }
  })
);