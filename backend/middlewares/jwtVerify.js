
const jwt = require("jsonwebtoken");

const jwtVerify = (req, res, next) => {
  const token = req.cookies.jwt_token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401).json({ message: "Invalid token" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

module.exports = jwtVerify;