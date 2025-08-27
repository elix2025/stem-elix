import express from "express";
import { sendEmail } from "../config/mailer.js";

const router = express.Router();

router.post("/send-test", async (req, res) => {
  try {
    const { to } = req.body;

    await sendEmail({
      to,
      subject: "Tinkrion Test Email",
      text: "This is a test email from your e-learning platform 🚀",
      html: "<h2>Welcome to Tinkrion!</h2><p>This is a test email.</p>",
    });

    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
