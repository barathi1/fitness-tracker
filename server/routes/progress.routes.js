const express = require("express");
const router = express.Router();
const progressController = require("../controllers/ProgressContrller");

router.get("/", progressController.getAllProgress);
router.get("/:userId", progressController.getUserProgress);
router.post("/", progressController.addProgress);
router.put("/:id", progressController.updateProgress);
router.delete("/:id", progressController.deleteProgress);

module.exports = router;


