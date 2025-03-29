const Water = require("../models/water");
const Sleep = require("../models/sleepmodel");
const User = require("../models/User");

const Cardio = require("../models/Cardio");
const Resistance = require("../models/Resistance");
const Goal = require("../models/goal");
const NutritionTracking = require("../models/nutritionTracking");








// Get progress by user ID
exports.getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch data with .lean() to prevent circular references
    const cardio = await Cardio.find({ userId }).lean();
    const resistance = await Resistance.find({ userId }).lean();
    const nutritionTracking = await NutritionTracking.find({ userId }).lean(); // Added missing await
    const user = await User.findById(userId).lean();
    
    if (!user) return res.status(404).json({ message: "User not found" });

    const goal = await Goal.find({ email: user.email }).lean();
    const sleep = await Sleep.find({ userId }).lean();

    const progress = {
      cardio,
      resistance,
      nutritionTracking,
      goal,
      sleep,
    };

    console.log(progress);

    return res.status(200).json({
      progress,
    });
  } catch (error) {
    console.error("Error fetching progress:", error.message);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};






