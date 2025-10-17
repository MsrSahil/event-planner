// authController.js

export const Login = async (req, res, next) => {
  try {
    const { email, password, otp } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // --- LOGIC MEIN SUDHAR YAHAN SE HAI ---

    // Case 1: Agar user ka 2FA ON hai
    if (existingUser.TwoFactorAuth) {
      if (!otp) {
        return res.status(401).json({ message: "OTP is required for login." });
      }

      const fetchOtp = await OTP.findOne({ email });
      if (!fetchOtp) {
        return res.status(404).json({ message: "OTP has expired. Please try again." });
      }

      const isOtpValid = await bcrypt.compare(otp.toString(), fetchOtp.otp);
      if (!isOtpValid) {
        return res.status(401).json({ message: "Invalid OTP provided." });
      }
      
      // OTP sahi hai, to use delete karein
      await OTP.deleteOne({ email });

    }
    
    // Case 2: Agar 2FA OFF hai, ya 2FA ON tha aur OTP verify ho chuka hai
    // Ab user ko login kar dein
    genToken(existingUser, res);

    res.status(200).json({
      message: "Login successful",
      data: existingUser,
    });

  } catch (error) {
    next(error);
  }
};