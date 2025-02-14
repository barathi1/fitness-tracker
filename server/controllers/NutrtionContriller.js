const {  User  ,Meal} = require("../models");

module.exports = {

  async createMeal({ body }, res) {
    try {
       
    
        // Create new meal object
        const userMeal = new Meal(body);
    
        // Save to database
        await userMeal.save();
    
        console.log("Meal Saved Successfully:", userMeal);
    
        // Send success response
        return res.status(201).json({
          success: true,
          message: "Meal added successfully",
          data: userMeal,
        });
      } catch (error) {
        console.error("Error Saving Meal:", error.message);
    
        // Send error response
        return res.status(500).json({
          success: false,
          message: "Failed to add meal",
          error: error.message,
        });
      }
   

   
  },

 
  getMealById({ params }, res) {
    
  },

  deleteMeal({ params }, res) {

 
  }
};
