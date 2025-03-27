const Goal = require("../models/goal");

// Get all goals for a specific user
exports.getGoals = async (req, res) => {
  const { email } = req.query; // Get email from query parameters
  try {
    const goals = await Goal.find(email ? { email } : {}); // Filter by email if provided
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new goal
exports.createGoal = async (req, res) => {
  const { title, progress, email } = req.body;
  try {
    if (!email) return res.status(400).json({ message: "User email is required" });

    const newGoal = new Goal({ title, progress: progress || 0, email });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update goal progress
exports.updateGoal = async (req, res) => {
  const { id } = req.params;
  const { progress } = req.body;

  try {
    const updatedGoal = await Goal.findByIdAndUpdate(id, { progress }, { new: true });
    if (!updatedGoal) return res.status(404).json({ message: "Goal not found" });
    res.json(updatedGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a goal
exports.deleteGoal = async (req, res) => {
  const { id } = req.params;
  try {
    await Goal.findByIdAndDelete(id);
    res.json({ message: "Goal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
