const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  progress: { type: Number, default: 0 },
  email: { type: String, required: true }, // Add user email field
});



const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
