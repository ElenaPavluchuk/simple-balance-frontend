const jwt = require("jsonwebtoken");
const ApiError = require("../errors/apiError.js");

const authenticate = (req, _res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(ApiError.unauthorized());
    }

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedUser;

    return next();
  } catch (err) {
    console.error(err);
    return next(ApiError.unauthorized("Invalid or expired token"));
  }
};

module.exports = authenticate;
