require("dotenv").config({ quiet: true });
const express = require("express");
const cors = require("cors");
const path = require("path");
const error = require("./middlewares/error.js");
const router = require("./routes/routes.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(error);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
