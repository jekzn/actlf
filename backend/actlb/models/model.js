const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  date: {
    required: true,
    type: Date,
  },
  sleep_duration: {
    required: true,
    type: Number,
  },
  sleep_quality: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Data", dataSchema);
