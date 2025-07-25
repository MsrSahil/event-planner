import contactUsData from "../models/contactUsModels.js";

export const handleContactForm = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error); // ✅ return here to avoid executing the rest
    }

    console.log("📩 Contact form submitted:", { name, email, phone, message });

    await contactUsData.create({ name, email, phone, message });
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    next(error); // ✅ works now because 'next' is defined
  }
};
