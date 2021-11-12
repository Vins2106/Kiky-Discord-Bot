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
        required: false,
        default: 50 * 1000
      },
      bank: {
        type: Number,
        required: false,
        default: 10 * 1000
      }
    },
    items: {
      type: Array,
      required: false,
      default: []
    },
    animals: {
      type: Array,
      require: false,
      default: []
    },
    banned: {
      type: Boolean,
      require: false,
      default: false
    }
  })
);