const mongoose = require("mongoose");

const WaterProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  waterCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("WaterProgress", WaterProgressSchema);
