const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find();
  res.render("booking", { bookings });
};

exports.showAddForm = async (req, res) => {
  const rooms = await Room.find();
  res.render("bookRoom", { rooms });
};

exports.addBooking = async (req, res) => {
  const { customerName, roomNumber, startTime, endTime } = req.body;

  const room = await Room.findOne({ roomNumber });

  if (!room) {
    return res.send("Room does not exist");
  }

  const hours =
    (new Date(endTime) - new Date(startTime)) /
    (1000 * 60 * 60);

  const totalAmount = hours * room.pricePerHour;

  await Booking.create({
    customerName,
    roomNumber,
    startTime,
    endTime,
    totalAmount,
  });

  res.redirect("/bookings");
};

exports.deleteBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.redirect("/bookings");
};

exports.showUpdateForm = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  res.render("updateRoom", { booking });
};

exports.updateBooking = async (req, res) => {
  await Booking.findByIdAndUpdate(
    req.params.id,
    req.body
  );

  res.redirect("/bookings");
};