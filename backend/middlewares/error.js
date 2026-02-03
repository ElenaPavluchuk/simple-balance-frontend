const ApiError = require("../errors/apiError.js");

const error = (err, _req, res, _next) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Unexpected error",
  });
};

module.exports = error;
