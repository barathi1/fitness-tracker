const Progress = require("../models/progressModel");

// Get all progress records
exports.getAllProgress = async (req, res) => {
  try {
    const progress = await Progress.find();
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get progress by user ID
exports.getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.params.userId });
    if (!progress) return res.status(404).json({ message: "No progress found" });
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Add new progress entry
exports.addProgress = async (req, res) => {
  try {
    const newProgress = new Progress(req.body);
    await newProgress.save();
    res.status(201).json(newProgress);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
};

// Update progress by ID
exports.updateProgress = async (req, res) => {
  try {
    const updatedProgress = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProgress) return res.status(404).json({ message: "Progress not found" });
    res.status(200).json(updatedProgress);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
};

// Delete progress by ID
exports.deleteProgress = async (req, res) => {
  try {
    const deletedProgress = await Progress.findByIdAndDelete(req.params.id);
    if (!deletedProgress) return res.status(404).json({ message: "Progress not found" });
    res.status(200).json({ message: "Progress deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
