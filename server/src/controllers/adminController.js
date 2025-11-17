import { response } from "express";
import Contact from "../models/contactModel.js";
import sendEmail from "../utils/sendEmail.js";
import cloudinary from "../config/cloudinary.js";
import Banquet from "../models/BanquetMondel.js";
import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";
import Caterer from "../models/CateringModel.js";


const UploadMultipleToCloudinary = async (Images) => {
  // const UploadMultipleToCloudinary = (Images) => {
  //   const ImageUrls = [];
  //   Images.forEach(async (image) => {
  //     const b64 = Buffer.from(image.buffer).toString("base64");
  //     const dataURI = `data:${image.mimetype};base64,${b64}`;

  //     const result = await cloudinary.uploader.upload(dataURI, {
  //       folder: "EventManagement",
  //       width: 500,
  //       height: 500,
  //       crop: "fill",
  //     });

  //     ImageUrls.push(result.secure_url);
  //   });

  //   return ImageUrls;
  // };

  const uploadPromises = Images.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "EventManagement",
      width: 500,
      height: 500,
      crop: "fill",
    });

    return result.secure_url;
  });

  const ImageUrls = await Promise.all(uploadPromises);

  return ImageUrls;
};

export const GetAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ message: "All Contacts Fetched", data: contacts });
  } catch (error) {
    next(error);
  }
};

export const UpdateContacts = async (req, res, next) => {
  try {
    const QueryId = req.params.Qid;
    const { status, reply } = req.body;

    const updatedQuery = await Contact.findByIdAndUpdate(
      QueryId,
      {
        status,
        reply,
      },
      { new: true }
    );

    const statusColors = {
      Pending: "#f0ad4e",
      Resolved: "#5cb85c",
      Rejected: "#d9534f",
    };
    const mailBody = `
     <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
    <div style="max-width: 600px; background-color: #ffffff; margin: 0 auto; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 30px;">
      <h2 style="color: #333333;">Message Status Notification</h2>

      <p style="margin: 10px 0;"><strong style="color: #555;">Name:</strong> <span style="color: #000;">${
        updatedQuery.name
      }</span></p>

      <p style="margin: 10px 0;"><strong style="color: #555;">Phone:</strong> <span style="color: #000;">${
        updatedQuery.phone
      }</span></p>

      <p style="margin: 10px 0;"><strong style="color: #555;">Original Message:</strong><br />
        <span style="color: #000;">${updatedQuery.message}</span>
      </p>

      <p style="margin: 10px 0;"><strong style="color: #555;">Festive Flair Reply:</strong><br />
        <span style="color: #000;">${updatedQuery.reply}</span>
      </p>

       <p style="margin: 10px 0;"><strong style="color: #555;">Note:</strong>
        <span style="color: #000;">Please Contact Again if Required.</span>
      </p>

      <p style="margin: 10px 0;">
        <strong style="color: #555;">Status:</strong>
        <span style="display: inline-block; padding: 6px 12px; font-weight: bold; border-radius: 5px; color: #fff; background-color: ${
          statusColors[updatedQuery.status]
        };">
          ${updatedQuery.status}
        </span>
      </p>

      
      <p style="margin-top: 30px; font-size: 12px; color: #999; text-align: center;">
        © ${new Date().getFullYear()} Festive Flair Event Planner PVT. LTD. | All rights reserved.
      </p>
    </div>
  </div>
    `;

    const MailStatus = await sendEmail(
      updatedQuery.email,
      updatedQuery.subject,
      mailBody
    );

    if (!MailStatus) {
      console.log("Error Sending Email");
    }

    res.status(200).json({ message: "Contact Updated", data: updatedQuery });
  } catch (error) {
    next(error);
  }
};

export const AddNewBanquetHall = async (req, res, next) => {
  try {
    const {
      hallName,
      address,
      capacity,
      managerName,
      contactNumber,
      email,
      rent,
      minBookingAmount,
      featureDescription,
    } = req.body;

    const imageFiles = req.files;
    const photos = await UploadMultipleToCloudinary(imageFiles);
    console.log(photos);
    if (photos.length <= 0) {
      const error = new Error("Fail to Upload Photos");
      error.statusCode = 502;
      return next(error);
    }
    const NewBanquetHall = await Banquet.create({
      hallName,
      address,
      capacity,
      managerName,
      contactNumber,
      email,
      rent,
      minBookingAmount,
      featureDescription,
      photos,
    });

    res
      .status(200)
      .json({ message: "Banquet Hall Added", data: NewBanquetHall });
  } catch (error) {
    next(error);
  }
};

export const GetAllBanquetHalls = async (req, res, next) => {
  try {
    const AllBanquetHalls = (await Banquet.find()) || "";

    res
      .status(200)
      .json({ message: "All Data Fetched", data: AllBanquetHalls });
  } catch (error) {
    next(error);
  }
};

export const GetAllBookings = async (req, res, next) => {
  try {
    // Return all bookings for admin view, include basic user info
    const bookings = await Booking.find()
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "All bookings fetched", data: bookings });
  } catch (error) {
    next(error);
  }
};

export const GetAllCatering = async (req, res, next) => {
  try {
    const items = await Caterer.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Catering list fetched", data: items });
  } catch (error) {
    next(error);
  }
};

export const AddCatering = async (req, res, next) => {
  try {
    const {
      catererName,
      phone,
      bookingCharge,
      perPlateVeg,
      perPlateJain,
      perPlateNonVeg,
      details,
      status,
    } = req.body;

    const created = await Caterer.create({
      catererName,
      phone,
      bookingCharge,
      perPlateVeg,
      perPlateJain,
      perPlateNonVeg,
      details,
      status: status || "Active",
    });

    res.status(201).json({ message: "Catering created", data: created });
  } catch (error) {
    next(error);
  }
};

export const UpdateCatering = async (req, res, next) => {
  try {
    const id = req.params.id;
    const existing = await Caterer.findById(id);
    if (!existing) {
      const error = new Error("Catering item not found");
      error.statusCode = 404;
      return next(error);
    }

    const updates = req.body || {};
    Object.keys(updates).forEach((k) => {
      existing[k] = updates[k] ?? existing[k];
    });

    await existing.save();
    res.status(200).json({ message: "Catering updated", data: existing });
  } catch (error) {
    next(error);
  }
};

export const DeleteCatering = async (req, res, next) => {
  try {
    const id = req.params.id;
    const existing = await Caterer.findById(id);
    if (!existing) {
      const error = new Error("Catering item not found");
      error.statusCode = 404;
      return next(error);
    }

    await existing.remove();
    res.status(200).json({ message: "Catering deleted" });
  } catch (error) {
    next(error);
  }
};

export const UpsertBookingByAdmin = async (req, res, next) => {
  try {
    const {
      id,
      userId,
      hallName,
      title,
      date,
      amount,
      status,
      notes,
    } = req.body;

    // If id provided -> update existing booking
    if (id) {
      const existing = await Booking.findById(id);
      if (!existing) {
        const error = new Error("Booking not found");
        error.statusCode = 404;
        return next(error);
      }

      // update fields selectively
      existing.hallName = hallName ?? existing.hallName;
      existing.title = title ?? existing.title;
      existing.date = date ? new Date(date) : existing.date;
      existing.amount = amount !== undefined ? Number(amount) : existing.amount;
      existing.status = status ?? existing.status;
      existing.notes = notes ?? existing.notes;

      await existing.save();

      // notify user
      try {
        const bookingUser = await User.findById(existing.user);
        if (bookingUser) {
          const mailBody = `<p>Hi ${bookingUser.fullName},</p>
            <p>Your booking <strong>${existing.hallName}</strong> has been updated by admin. Status: <strong>${existing.status}</strong></p>`;
          sendEmail(bookingUser.email, "Your booking was updated", mailBody).catch((e) => console.error(e));
        }
      } catch (e) {
        console.error("Failed to send booking update email", e);
      }

      return res.status(200).json({ message: "Booking updated", data: existing });
    }

    // Create new booking - require userId
    if (!userId) {
      const error = new Error("userId is required to create a booking");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    const newBooking = await Booking.create({
      user: user._id,
      hallName,
      title,
      date: date ? new Date(date) : undefined,
      amount: amount ? Number(amount) : undefined,
      status: status || "Pending",
      notes,
    });

    // Notify user
    try {
      const mailBody = `<p>Hi ${user.fullName},</p>
        <p>An admin has created a booking for you: <strong>${newBooking.hallName}</strong> on <strong>${newBooking.date?.toLocaleString() || "-"}</strong>.</p>
        <p>Booking ID: ${newBooking._id}</p>`;
      sendEmail(user.email, "New booking created for you", mailBody).catch((e) => console.error(e));
    } catch (e) {
      console.error("Failed to send booking created email", e);
    }

    res.status(201).json({ message: "Booking created", data: newBooking });
  } catch (error) {
    next(error);
  }
};
