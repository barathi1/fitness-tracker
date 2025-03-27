const {SleepEntry} = require("../models/index");

const moment = require("moment");

// Get all sleep entries
exports.getSleepEntries = async (req, res) => {
  try {
    const entries = await SleepEntry.find({userId:req.params.id});
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new sleep entry
exports.addSleepEntry = async (req, res) => {
    try {
        const { userId, sleepHours } = req.body;
        const today = moment().format("YYYY-MM-DD"); // Get today's date
    
        let entry = await SleepEntry.findOne({ userId, date: today });
    
        if (entry) {
          // If an entry exists, increase sleep hours
          entry.sleepHours += sleepHours;
        } else {
          // If no entry exists, create a new one
          entry = new SleepEntry({ userId, date: today, sleepHours });
        }
    
        await entry.save();
        res.status(200).json({ message: "Sleep entry updated!", sleepHours: entry.sleepHours });
      } catch (err) {
        res.status(500).json({ error: "Server Error", details: err.message });
      }
};

// Delete a sleep entry
exports.deleteSleepEntry = async (req, res) => {
  try {
    await SleepEntry.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
