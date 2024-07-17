const fs = require("fs").promises;
const path = require("path");

const files = ["A.txt", "B.txt", "C.txt", "D.txt"];

async function saveNumber(filePath, number) {
  try {
    await fs.appendFile(path.join(__dirname, "..", filePath), number + "\n");
  } catch (error) {
    throw new Error(`Failed to write to file: ${error.message}`);
  }
}

async function checkAllFilesHaveNumbers() {
  for (const file of files) {
    try {
      const data = await fs.readFile(path.join(__dirname, "..", file), "utf-8");
      if (!data.trim()) return false;
    } catch (error) {
      if (error.code === "ENOENT") return false; // File does not exist
    }
  }
  return true;
}

async function getAllNumbers() {
  const allNumbers = {};

  for (const file of files) {
    try {
      const data = await fs.readFile(path.join(__dirname, "..", file), "utf-8");
      allNumbers[file] = data.split("\n").filter(Boolean);
    } catch (error) {
      allNumbers[file] = [];
    }
  }

  return allNumbers;
}

module.exports = {
  saveNumber,
  getAllNumbers,
  checkAllFilesHaveNumbers,
};
