const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "sneakerzz",
      }
    );

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
  console.log("FULL CLOUDINARY ERROR:");
  console.log(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

module.exports = { uploadImage };

