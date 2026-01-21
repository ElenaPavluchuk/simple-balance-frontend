require("dotenv").config({ quiet: true });
const express = require("express");
const cors = require("cors");
const router = require("./routes/routes.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
