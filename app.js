const express = require("express");
const mongoose = require("mongoose");

const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

mongoose.connect(
  "mongodb://127.0.0.1:27017/karaokeDB"
);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/bookings", bookingRoutes);

app.listen(3000, () => {
  console.log("Server running...");
});