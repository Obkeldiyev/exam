const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes");
dotenv.config();

const app = express();
app.use(express.json());
app.use(router)

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(PORT));