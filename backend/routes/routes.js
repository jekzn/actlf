const express = require("express");
const Data = require("../models/model");
const router = express.Router();

const corsOptions = {
  origin: "http://localhost:8080",
  methods: "GET, POST",
};

function calculateTotalMinutes(bedtime, wakeup) {
  const [bedHour, bedMin] = bedtime.split(":").map(Number);
  const [wakeHour, wakeMin] = wakeup.split(":").map(Number);
  return (wakeHour - bedHour) * 60 + (wakeMin - bedMin);
}
function getEvaluationMessage(totalMinutes) {
  if (totalMinutes < 360) {
    return "You didn't get enough sleep. Consider getting more rest.";
  } else if (totalMinutes > 480) {
    return "You slept too much.";
  } else {
    return "You slept well!";
  }
}
//post
router.post("/sleep", async (req, res) => {
  const { date, bedtime, wakeup } = req.body;
  const totalMinutes = calculateTotalMinutes(bedtime, wakeup);
  const evaluation = getEvaluationMessage(totalMinutes);

  const newSleepEntry = new Data({ date, bedtime, wakeup, evaluation });
  try {
    const savedEntry = await newSleepEntry.save();

    res.json(savedEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save sleep data." });
  }
});

router.get("/sleep", async (req, res) => {
  try {
    const allSleepEntries = await Data.find();

    res.json(allSleepEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sleep data." });
  }
});

router.get("/sleep", async (req, res) => {
  try {
    const allSleepEntries = await Data.find();

    res.json(allSleepEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sleep data." });
  }
});
router.delete("/sleep", async (req, res) => {
  try {
    await Data.deleteMany({});

    res.json({ message: "Sleep data cleared successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to clear sleep data." });
  }
});
module.exports = router;
