const isAdmin = (req, res, next) => {
  if (req.user && req.user.admin) {
    return next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = isAdmin;
