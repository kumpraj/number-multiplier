const express = require("express");
const router = express.Router();
const {
  saveNumber,
  getAllNumbers,
  checkAllFilesHaveNumbers,
} = require("../utils/fileOperations");

router.post("/submit-number", async (req, res) => {
  const { number } = req.body;

  if (!number || number === null) {
    return res.status(400).json({ error: "Number is required" });
  }

  if (typeof number !== "number" || number < 1 || number > 25) {
    return res.status(400).json({ error: "Number must be between 1 and 25" });
  }

  const result = number * 7;
  const filePath = getFilePath(result);

  try {
    const allFilesHaveNumbers = await checkAllFilesHaveNumbers();
    if (allFilesHaveNumbers) {
      return res.status(400).json({
        error:
          "All files already have numbers. No more numbers can be accepted.",
      });
    }
    await saveNumber(filePath, result);
    res.json({ message: `Number stored in ${filePath}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/numbers", async (req, res) => {
  try {
    const allNumbers = await getAllNumbers();
    res.json(allNumbers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function getFilePath(result) {
  if (result > 140) return "A.txt";
  if (result > 100) return "B.txt";
  if (result > 60) return "C.txt";
  return "D.txt";
}

module.exports = router;
