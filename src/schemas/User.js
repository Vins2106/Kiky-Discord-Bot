  const { Schema, model } = require("mongoose");
module.exports = model(
  "User",
  new Schema({
    ID: {
      type: String,
      required: true
    },
    coins: {
      wallet: {
        type: Number,
        default: 50000
      },
      bank: {
        type: Number,
        default: 50000
      }
    },
    items: {
      type: Array,
      default: []
    },
    animals: {
      type: Array,
      default: []
    },
    banned: {
      type: Boolean,
      default: false
    }
  })
);