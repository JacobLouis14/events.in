const jwt = require("jsonwebtoken");

const isAuthorized = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = req.headers.authorization;
    if (!token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const accessToken = token.split(" ")[1];

    jwt.verify(accessToken, process.env.JWTACCESSTOKENKEY, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error: error });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (!req.user || req.user.usertype != "admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized", desc: "Admin only" });
    }

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized", desc: "Admin only" });
  }
};

module.exports = { isAuthorized, isAdmin };
