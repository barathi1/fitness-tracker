const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  caloriesBurned: { type: Number, required: true },
  workoutsCompleted: { type: Number, required: true },
  healthyMeals: { type: Number, required: true },
  waterIntake: { type: Number, required: true }, // in liters
  sleepHours: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Progress", progressSchema);
