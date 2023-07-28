const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  date: {
    required: true,
    type: String,
  },
  bedtime: {
    required: true,
    type: String,
  },
  wakeup: {
    required: true,
    type: String,
  },
  evaluation: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Data", dataSchema);
