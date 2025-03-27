const express = require("express");
const router = express.Router();
const { getWaterIntake, addWater, resetWater } = require("../../controllers/watercontroller");

router.get("/:userId", getWaterIntake);
router.post("/", addWater);
router.delete("/reset/:userId", resetWater);

// router.post("/goal-achieved", async (req, res) => {
//     try {
//       // Mark goal as achieved in the database
//       await WaterIntake.updateOne({ userId: req.body.userId }, { goalAchieved: true });
//       res.status(200).json({ message: "Goal achieved recorded" });
//     } catch (error) {
//       res.status(500).json({ error: "Error updating goal status" });
//     }
//   });



module.exports = router;
