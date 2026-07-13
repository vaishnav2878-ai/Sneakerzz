const admin = (req, res, next) => {
  console.log("ROLE:", JSON.stringify(req.user?.role));
  console.log("ROLE TYPE:", typeof req.user?.role);
  console.log(
    "COMPARE:",
    req.user?.role?.trim() === "admin"
  );

  if (req.user && req.user.role.trim() === "admin") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Admin Access Only",
  });
};

module.exports = { admin };