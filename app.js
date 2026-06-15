const express = require("express");
const mongoose = require("mongoose");

const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/karaokeDB"
);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/bookings");
});

app.use("/bookings", bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

module.exports = app;