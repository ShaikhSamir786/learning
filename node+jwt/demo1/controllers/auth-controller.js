const logger = require("../configs/logger");
const User = require("../models/authmodels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../mailservices/mail");
const sendResetPassword = require("../mailservices/send-reset-mail");


require("dotenv").config();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

const registeruser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // check existing
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedpassword,
      otp: hashedOtp,
      otpExpiry: Date.now() + 10 * 60 * 1000, // 10 min
    });

    await user.save();
    await sendVerificationEmail(email, otp);
    console.log(
      "🚀 ~ registeruser ~ sendVerificationEmail:",
      sendVerificationEmail
    );

    logger.info(`User created: ${email}`);

    res.status(201).json({ message: " user created" });
  } catch (error) {
    res.status(500).json({ message: "error in creating user" });
    logger.error("User registration failed");
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.verified)
      return res.status(400).json({ message: "Already verified" });

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({ message: "OTP not generated" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const match = await bcrypt.compare(otp, user.otp);
    if (!match) return res.status(400).json({ message: "Invalid OTP" });

    user.verified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    next(err);
  }
};

const loginuser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "email not found " });

    if (!user.verified) {
      return res
        .status(403)
        .json({ message: "Please verify your email first" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ message: "wrong password" });

    const jwttoken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token: jwttoken,
      user: {
        id: user._id,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "error in login user" });
    logger.error("User login failed");
  }
};

const changePassword = async (req, res) => {
  const userId = req.user._id; // from auth middleware
  console.log("🚀 ~ changePassword ~ userId:", userId);

  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    console.log("🚀 ~ changePassword ~ user:", user);

    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match)
      return res.status(400).json({ message: "Current password is incorrect" });

    const hashed = await bcrypt.hash(
      newPassword,
      parseInt(process.env.BCRYPT_SALT_ROUNDS || "12")
    );
    user.password = hashed;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error changing password" });
  }
};

//👍 You’re describing a two-step password reset flow:
// User enters email → OTP sent
// User verifies OTP + enters new password → update in DB

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    const otpforresetpassword = generateOTP();
    console.log(
      "🚀 ~ forgotPassword ~ otpforresetpassword:",
      otpforresetpassword
    );

    await sendResetPassword(
      user.email,
      otpforresetpassword // <-- actual OTP
    );
    //store otp and expiry in db
    user.otp = otpforresetpassword;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 min

    await user.save();

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    logger.error(" failed to send  OTP");
    res.status(500).json({ message: "error in forgot-password " });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // check OTP and expiry
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // hash new password
    const hashednewpassword = await bcrypt.hash(newPassword, 10);
    user.password = hashednewpassword;

    // clear otp
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    logger.error("Failed to reset password", error);
    return res.status(500).json({ message: "Error in reset-password" });
  }
};



module.exports = {
  registeruser,
  loginuser,
  verifyEmail,
  changePassword,
  forgotPassword,
  resetPassword,
};
