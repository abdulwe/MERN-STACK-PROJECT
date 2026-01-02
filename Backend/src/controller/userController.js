import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.js";


// r) {
//     console.error("EMAIL SEND ERROR:", error);
//   }// ================= SEND EMAIL HELPER =================
// const sendEmail = async ({ to, subject, text, html }) => {
//   try {
//     await transporter.sendMail({
//       from: `"Kiddo Tech Solutions" <${process.env.SMTP_USER}>`,
//       to,
//       subject,
//       text,
//       html,
//     });
//   } catch (erro
// };

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const { userName, email, whatsAppNumber, password } = req.body;

    if (!userName || !email || !whatsAppNumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      whatsAppNumber,
      password: hashedPassword,
    });

    // // ✅ Send Welcome Email
    // await sendEmail({
    //   to: email,
    //   subject: "Welcome to Kiddo Tech Solutions 🎉",
    //   text: `Hello ${userName}, welcome to Kiddo Tech Solutions!`,
    //   html: `
    //     <h2>Welcome, ${userName} 🎉</h2>
    //     <p>We’re glad to have you on board.</p>
    //   `,
    // });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

// ================= SIGN IN (NO OTP) =================
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("SIGNIN ERROR:", error);
    res.status(500).json({ message: "Signin failed" });
  }
};
