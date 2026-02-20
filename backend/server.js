require("dotenv").config({ quiet: true });
const express = require("express");
const cors = require("cors");
const error = require("./middlewares/error.js");
const router = require("./routes/routes.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use(error);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

// backend structure:
// SERVER -> ROUTES -> MIDDLEWARES -> CONTROLLERS -> SERVICES -> DATABASE

// database structure:
// exchange rates -> currencies → users → categories → transactions
// транзакции и категории зависят от пользователей, а пользователи — от валют, а валюты от курсов
