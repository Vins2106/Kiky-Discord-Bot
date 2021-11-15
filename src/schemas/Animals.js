const { Schema, model } = require("mongoose");
module.exports = model(
  "User",
  new Schema({
    name: {
      type: String,
      required: true
    },
    owner: {
      type: String,
      required: true,
    },
    skills: {
      type: Array,
      required: true,
      default: []
    },
    emoji: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  } )
);