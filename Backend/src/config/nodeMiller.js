import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

// Debug: Ensure env vars are loaded
console.log("SMTP_USER:", process.env.SMTP_USER ? "LOADED" : "MISSING");
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "LOADED" : "MISSING");
console.log("SENDER_EMAIL:", process.env.SENDER_EMAIL ? "LOADED" : "MISSING");

// Setup transporter for Brevo SMTP
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com", // Brevo SMTP host
  port: 587,                     // TLS port
  secure: false,                 // false for 587 (STARTTLS)
  auth: {
    user: process.env.SMTP_USER, // SMTP username
    pass: process.env.SMTP_PASS, // SMTP password
  },
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP CONFIG ERROR:", error);
  } else {
    console.log("SMTP Ready to send emails");
  }
});

// Function to send emails
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Kiddo App" <${process.env.SENDER_EMAIL || process.env.SMTP_USER}>`, // Use SENDER_EMAIL if defined
      to,
      subject,
      text,
      html,
    });
    console.log(`Email sent to ${to}: ${info.messageId}`);
  } catch (error) {
    console.error("EMAIL SEND ERROR:", error);
  }
};

export default transporter;
