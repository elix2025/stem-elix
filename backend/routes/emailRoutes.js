import express from "express";
import { sendEmail } from "../config/mailer.js";

const router = express.Router();

router.post("/send-register", async (req, res) => {
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

router.post("/send-enroll", async (req, res) => {
  try {
    const { to, courseTitle } = req.body;

    await sendEmail({
      to,
      subject: `Enrolled in ${courseTitle} - Tinkrion`,
      text: `You have successfully enrolled in the course: ${courseTitle}.`,
      html: `<h2>Enrollment Successful!</h2><p>You have successfully enrolled in the course: <strong>${courseTitle}</strong>.</p>`,
    });
    res.json({ success: true, message: "Enrollment email sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/send-invoice", async (req, res) => {
  try {
    const { to, invoiceDetails } = req.body;
    await sendEmail({
      to,
      subject: "Your Invoice from Tinkrion",
      text: `Here are your invoice details: ${invoiceDetails}`,
      html: `<h2>Your Invoice</h2><p>Here are your invoice details:</p><pre>${invoiceDetails}</pre>`,
    });
  }catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/send-meeting-link", async (req, res) => {
  try {
    const { to, meetingLink, meetingTime } = req.body;
    await sendEmail({
      to,
      subject: "Your Meeting Link from Tinkrion",
      text: `Your meeting is scheduled at ${meetingTime}. Join using this link: ${meetingLink}`,
      html: `<h2>Your Meeting Link</h2><p>Your meeting is scheduled at <strong>${meetingTime}</strong>.</p><p>Join using this link: <a href="${meetingLink}">${meetingLink}</a></p>`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
export default router;
