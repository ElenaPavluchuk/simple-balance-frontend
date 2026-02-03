const ApiError = require("../errors/apiError.js");

const verifyRole = (roleName) => {
  return (req, _res, next) => {
    if (req.method === "OPTIONS") {
      return next();
    }

    if (!req.user) {
      return next(ApiError.unauthorized());
    }

    if (req.user.role !== roleName) {
      return next(ApiError.forbidden());
    }

    return next();
  };
};

module.exports = verifyRole;
