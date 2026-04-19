const fs = require("fs");
const path = require("path");

const deleteImageFile = (imageUrl) => {
  if (!imageUrl) return;

  try {
    const imagePath = path.join(
      __dirname,
      "..",
      "uploads",
      path.basename(imageUrl),
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  } catch (err) {
    console.error("Error deleting image:", err.message);
  }
};

module.exports = deleteImageFile;
