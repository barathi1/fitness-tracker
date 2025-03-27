const mongoose = require("mongoose");

const SleepEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  sleepHours: { type: Number, required: true },
});


const SleepEntryS= mongoose.model("SleepEntry", SleepEntrySchema);

module.exports = SleepEntryS
