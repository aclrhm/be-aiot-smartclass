const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/index"));

app.get("/", (req, res) => {
  res.send("Backend AIoT aktif 🚀");
});

module.exports = app; 
