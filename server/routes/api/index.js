const router = require("express").Router();
const userRoutes = require("./user-routes");
const exerciseRoutes = require("./exercise-routes");
const MealRoute = require("./MealRoute");
const Goalroute = require("./goal-route");
const water = require("./waterrotes");
const sleep = require("./sleeproutes");
const remaiders = require("./remaiders.route");
const progress = require("../progress.routes");


router.use("/user", userRoutes);
router.use("/exercise", exerciseRoutes);
router.use("/meal", MealRoute);
router.use("/goal",Goalroute );
router.use("/water",water);
router.use("/sleep",sleep);
router.use("/reminders",remaiders);
router.use("/progress",progress)

module.exports = router;
