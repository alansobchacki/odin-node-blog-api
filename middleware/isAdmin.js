const isAdmin = (req, res, next) => {
  console.log("Admin check:", req.user); // Debugging: Check if user has admin status
  if (req.user && req.user.admin) {
    return next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = isAdmin;
