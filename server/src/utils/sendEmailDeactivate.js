import nodemailer from "nodemailer";


const sendEmailDeactivate = async (to,mailBody) => {
  try {
    const Truck = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSCODE,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      html: mailBody,
    };

    const result = await Truck.sendMail(mailOptions);
    console.log("Email Sent Successfully", result.messageId);
    return true;

  } catch (error) {
    console.error("Error sending Email", error);
    return false;
  }
};


export default sendEmailDeactivate;