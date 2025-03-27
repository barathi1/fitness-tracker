const express = require("express");
const router = express.Router();
const { getSleepEntries, addSleepEntry, deleteSleepEntry } = require("../../controllers/sleep.controller");

router.get("/:id", getSleepEntries);
router.post("/", addSleepEntry);
router.delete("/:id", deleteSleepEntry);

module.exports = router;
