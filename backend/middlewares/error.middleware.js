const ApiError = require("../errors/api.error.js");

const errorMiddleware = (err, req, res, _next) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};

module.exports = errorMiddleware;
