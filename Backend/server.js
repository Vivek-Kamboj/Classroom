const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const PORT = 4000;
const routes = require("./routes");

app.use(express.json());
app.use(cors());

app.use("/api/user", routes.user);
app.use("/api/subject", routes.subject);
app.use("/api/assignment", routes.assignment);
// Calender--future Scope
// Video Conferencing--future Scope

app.get("*", function (req, res) {
  res.send("404 Error");
});

app.listen(PORT, function () {
  console.log("Server running successfully");
});
