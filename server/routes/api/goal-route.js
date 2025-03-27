const express = require("express");
const { getGoals, createGoal, updateGoal, deleteGoal } = require("../../controllers/goal-controler");

const router = express.Router();

router.get("/", getGoals); // Fetch goals by user email if provided
router.post("/", createGoal); // Create goal with user email
router.put("/:id", updateGoal); // Update goal progress
router.delete("/:id", deleteGoal); // Delete a goal

module.exports = router;
