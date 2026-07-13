const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

console.log("TOKEN START:", token.substring(0, 30));
const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET
);

console.log("DECODED:", decoded);

      req.user = await User.findById(decoded.id).select("-password");
      console.log("Decoded ID:", decoded.id);
console.log("User:", req.user);
      console.log("Decoded ID:", decoded.id);
console.log("User from DB:", req.user);

      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }
  } catch (error) {
  console.log("JWT ERROR:", error);

  return res.status(401).json({
    success: false,
    message: error.message,
  });
}
  
};

module.exports = { protect };