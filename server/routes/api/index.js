const router = require("express").Router();
const userRoutes = require("./user-routes");
const exerciseRoutes = require("./exercise-routes");
const MealRoute = require("./MealRoute");


router.use("/user", userRoutes);
router.use("/exercise", exerciseRoutes);
router.use("/meal", MealRoute);

module.exports = router;
