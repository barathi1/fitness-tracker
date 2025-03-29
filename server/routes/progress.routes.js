const express = require("express");
const router = express.Router();
const progressController = require("../controllers/ProgressContrller");

router.get("/:userId", progressController.getUserProgress);

module.exports = router;


