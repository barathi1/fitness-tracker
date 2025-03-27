const { Water } = require("../models");
const moment = require("moment");

module.exports = {
  // Get water intake for today (per user)
  async getWaterIntake({ params }, res) {
    try {
      const { userId } = params; // Get userId from request params
      const today = moment().format("YYYY-MM-DD");

      let progress = await Water.findOne({ userId, date: today });

      if (!progress) {
        progress = new Water({ userId, date: today, waterCount: 0 });
        await progress.save();
      }

      return res.status(200).json({ waterCount: progress.waterCount });
    } catch (err) {
      return res.status(500).json({ error: "Server Error", details: err });
    }
  },

  // Add water intake (per user)
  async addWater({ body }, res) {
    try {
      const { userId } = body;
      console.log(userId);

      const today = moment().format("YYYY-MM-DD");

      let progress = await Water.findOne({ userId, date: today });

      if (!progress) {
        progress = new Water({ userId, date: today, waterCount: 1 });
      } else {
        if (progress.waterCount < 8) {
          progress.waterCount += 1;
        }
      }

      await progress.save();
      return res.status(200).json({ waterCount: progress.waterCount, message: "Water intake updated!" });
    } catch (err) {
      return res.status(500).json({ error: "Server Error", details: err });
    }
  },

  // Reset water intake (per user)
  async resetWater({ params }, res) {
    try {
      const { userId } = params;
      const today = moment().format("YYYY-MM-DD");

      const updatedProgress = await Water.findOneAndUpdate(
        { userId, date: today },
        { waterCount: 0 },
        { new: true }
      );

      return res.status(200).json({ message: "Water intake reset", waterCount: updatedProgress?.waterCount || 0 });
    } catch (err) {
      return res.status(500).json({ error: "Server Error", details: err });
    }
  }
};
