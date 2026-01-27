require("dotenv").config({ quiet: true });
const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error.middleware.js");
const router = require("./routes/routes.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use(errorMiddleware);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
