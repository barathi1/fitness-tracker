const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  title: { type: String, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model("Reminder", ReminderSchema);
