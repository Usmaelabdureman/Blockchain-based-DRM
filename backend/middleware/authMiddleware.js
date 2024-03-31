const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, config.secretKey);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};
