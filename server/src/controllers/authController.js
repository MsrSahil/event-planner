import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import genToken from "../utils/auth.js";
import Deactivation from "../models/deactivationModel.js";
import sendEmailDeactivate from "../utils/sendEmailDeactivate.js";

export const RegisterUser = async (req, res, next) => {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !phone || !password) {
      const error = new Error("All Feilds Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.status === "Active") {
      const error = new Error("Email Already Registerd");
      error.statusCode = 409;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePic = `https://placehold.co/600x400?text=${fullName
      .charAt(0)
      .toUpperCase()}`;

    if (existingUser && existingUser.status === "Inactive") {
      existingUser.fullName = fullName;
      existingUser.password = hashedPassword;
      existingUser.status = "Active";
      existingUser.photo = profilePic;
      existingUser.role = "User";
      await existingUser.save();
    } else {
      const newUser = await User.create({
        fullName,
        email,
        phone,
        password: hashedPassword,
        photo: profilePic,
      });
    }

    res.status(201).json({ message: "Registration Successfull" });
  } catch (error) {
    next(error);
  }
};

export const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All Feilds Required");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User Not registred");
      error.statusCode = 400;
      return next(error);
    }

    const isVerified = await bcrypt.compare(password, user.password);

    if (!isVerified) {
      const error = new Error("Invalid Username or Password");
      error.statusCode = 401;
      return next(error);
    }

    genToken(user._id, res);

    res
      .status(200)
      .json({ message: `Welcome Back ${user.fullName}`, data: user });
  } catch (error) {
    next(error);
  }
};

export const LogoutUser = (req, res, next) => {
  try {
    res.cookie("IDCard", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    next(error);
  }
};

export const UpdateUser = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const {
      fullName,
      phone,
      gender,
      occupation,
      address,
      city,
      state,
      district,
      representing,
    } = req.body;

    if (!currentUser) {
      const error = new Error("User Not Found !! Login Again");
      error.statusCode = 401;
      return next(error);
    }
    const photo = req.file;
    let picture;
    if (photo) {
      const b64 = Buffer.from(photo.buffer).toString("base64");
      const dataURI = `data:${photo.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "eventPlannerPictures",
        width: 500,
        height: 500,
        crop: "fill",
      });
      picture = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      {
        fullName,
        phone,
        gender,
        occupation,
        address,
        city,
        state,
        district,
        representing,
        photo: picture || currentUser.photo,
      },
      { new: true }
    );

    res.status(200).json({ message: "Profile Updated", data: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { reason, feedback, confirmPassword } = req.body;

    console.log(currentUser);

    console.log(reason, feedback, confirmPassword, currentUser.password);

    if (!currentUser) {
      const error = new Error("User Not Found !! Login Again");
      error.statusCode = 401;
      return next(error);
    }

    const isVerified = await bcrypt.compare(
      confirmPassword,
      currentUser.password
    );

    if (!isVerified) {
      const error = new Error("Invalid Username or Password");
      error.statusCode = 401;
      return next(error);
    }

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      {
        gender: "N/A",
        occupation: "N/A",
        address: "N/A",
        city: "N/A",
        state: "N/A",
        district: "N/A",
        representing: "N/A",
        photo: "N/A",
        role: "N/A",
        password: "N/A",
        status: "Inactive",
      },
      { new: true }
    );

    let supportEmail="mohammadswahil021@gmail.com";
    let reactivationUrl="mohammadswahil021@gmail.com";
    const mailBody = `
  <div style="font-family: Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px;">
    <div style="max-width: 600px; background-color: #ffffff; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 30px;">
      <h2 style="color: #1f2937; font-size: 24px; font-weight: 600; margin-bottom: 16px;">Account Deactivation Confirmation</h2>

      <p style="margin-bottom: 10px; color: #4b5563; font-weight: 600;">
        Dear: <span style="color: #111827; font-weight: 400;">${
          currentUser.name
        }</span>
      </p>

      <p style="margin-bottom: 10px; color: #4b5563; font-weight: 600;">
        Message:<br />
        <span style="color: #111827; font-weight: 400;">
          We’ve received your request to deactivate your account with Event Planner. We’re sorry to see you go and hope this isn’t a permanent goodbye.
        </span>
      </p>

      <p style="margin-bottom: 10px; color: #4b5563; font-weight: 600;">
        Status:<br />
        <span style="color: #111827; font-weight: 400;">Your account has been successfully deactivated.</span>
      </p>

      <p style="margin-bottom: 10px; color: #4b5563; font-weight: 600;">
        Note:<br />
        <span style="color: #111827; font-weight: 400;">
          If you change your mind, you can reactivate your account by contacting our support team at 
          <a href="mailto:${supportEmail}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${supportEmail}</a> 
          or visiting 
          <a href="${reactivationUrl}" style="color: #2563eb; text-decoration: none; font-weight: 500;">our reactivation page</a>.
        </span>
      </p>

      <p style="margin-bottom: 10px; color: #4b5563; font-weight: 600;">
        Feedback:<br />
        <span style="color: #111827; font-weight: 400;">
          We’d love to hear why you decided to deactivate your account. Your feedback helps us improve. Please share your thoughts by replying to this email or completing our 
          <a href="" style="color: #2563eb; text-decoration: none; font-weight: 500;">short feedback form</a>.
        </span>
      </p>

      <p style="margin-bottom: 10px;">
        <span style="color: #4b5563; font-weight: 600;">Account Status:</span>
        <span style="display: inline-block; padding: 6px 12px; font-weight: 600; border-radius: 5px; color: #ffffff; background-color: #dc2626;">
          Deactivated
        </span>
      </p>

      <p style="margin-top: 30px; font-size: 12px; color: #6b7280; text-align: center;">
        © ${new Date().getFullYear()} Event planner. All rights reserved.<br />
        <a href="" style="color: #2563eb; text-decoration: none;">Privacy Policy</a> | 
        <a href="" style="color: #2563eb; text-decoration: none;">Terms of Service</a>
      </p>
    </div>
  </div>
`;

    await sendEmailDeactivate(currentUser.email, mailBody);

    await Deactivation.create({ userId: currentUser._id, reason, feedback });

    res.status(200).json({ message: "Sorry to see you go . . ." });
  } catch (error) {
    next(error);
  }
};
