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

 
 async getMealById({ params }, res) {

  console.log("fgfgrs");
  

    const Meals = await Meal.find({userId:params.id})

   return res.status(200).json(Meals)
    
  },



async  deleteMeal({ params }, res) {

    const Meals = await Meal.findByIdAndDelete(params.id)

    return res.status(200).json(Meals)
 
  }
};
