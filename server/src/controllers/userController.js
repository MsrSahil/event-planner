import cloudinary from "../config/cloudinary.js";
import User from "../models/userModel.js";
import Booking from "../models/bookingModel.js";
import sendEmail from "../utils/sendEmail.js";

export const GetProfile = async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      const error = new Error("User Not Found !! Login Again");
      error.statusCode = 401;
      return next(error);
    }

    res.status(200).json({
      message: `Welcome back ${currentUser.fullName}`,
      data: currentUser,
    });
  } catch (error) {
    next(error);
  }
};

export const GetBookings = async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      const error = new Error("User Not Found !! Login Again");
      error.statusCode = 401;
      return next(error);
    }

    const bookings = await Booking.find({ user: currentUser._id }).sort({ createdAt: -1 });

    res.status(200).json({ message: "Bookings fetched", data: bookings });
  } catch (error) {
    next(error);
  }
};

export const CancelBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const currentUser = req.user;
    if (!currentUser) {
      const error = new Error("User Not Found !! Login Again");
      error.statusCode = 401;
      return next(error);
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      return next(error);
    }

    if (booking.user.toString() !== currentUser._id.toString()) {
      const error = new Error("Not authorized to cancel this booking");
      error.statusCode = 403;
      return next(error);
    }

    if (booking.status === "Cancelled") {
      return res.status(200).json({ message: "Booking already cancelled", data: booking });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled", data: booking });
  } catch (error) {
    next(error);
  }
};

export const CreateBooking = async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      const error = new Error("User Not Found !! Login Again");
      error.statusCode = 401;
      return next(error);
    }

    const { hallName, title, date, amount, notes } = req.body;

    if (!hallName || !date) {
      const error = new Error("hallName and date are required");
      error.statusCode = 400;
      return next(error);
    }

    const booking = await Booking.create({
      user: currentUser._id,
      hallName,
      title,
      date: new Date(date),
      amount: amount ? Number(amount) : undefined,
      notes,
    });

    // send a simple notification email to user
    const emailBody = `<p>Hi ${currentUser.fullName},</p>
      <p>Your booking for <strong>${hallName}</strong> on <strong>${new Date(date).toLocaleString()}</strong> has been received.</p>
      <p>Booking ID: ${booking._id}</p>
    `;

    sendEmail(currentUser.email, "Booking Received", emailBody).catch((e) => console.error(e));

    res.status(201).json({ message: "Booking created", data: booking });
  } catch (error) {
    next(error);
  }
};


