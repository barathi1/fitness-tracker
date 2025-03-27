const express = require("express");
const Reminder = require("../../models/remainders");

const router = express.Router();

// ➕ Add a Reminder
router.post("/", async (req, res) => {
  try {
    const { title, time,email } = req.body;
    const newReminder = new Reminder({ title, time,email });
    await newReminder.save();
    
    res.status(201).json(newReminder);

  } catch (err) {
    res.status(500).json({ error: "Failed to create reminder" });
  }
});

// 📜 Get All Reminders
router.get("/", async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
});

// 🗑️ Delete a Reminder
router.delete("/:id", async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.json({ message: "Reminder deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete reminder" });
  }
});

module.exports = router;
