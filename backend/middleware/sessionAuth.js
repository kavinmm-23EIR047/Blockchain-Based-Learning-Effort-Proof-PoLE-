export const requireLogin = (role) => {
  return (req, res, next) => {
    if (!req.session.user)
      return res.status(401).json({ msg: "Login required" });

    if (role && req.session.user.role !== role)
      return res.status(403).json({ msg: "Access denied" });

    next();
  };
};
