const { createMeal, getMealById, deleteMeal } = require("../../controllers/NutrtionContriller");

const router = require("express").Router();


router.route("/").post(createMeal)



// /api/user/me to get single user data
router.route('/id').get(getMealById);

router.route('/id').delete(deleteMeal);

module.exports = router;