import express from "express";
import { sendEmail } from "../config/mailer.js";

const router = express.Router();

router.post("/send-register", async (req, res) => {
  try {
    const { to, name } = req.body;

    await sendEmail({
      to,
      subject: "Welcome to STEMelix 🎉",
      text: `Hi ${name || ""}, welcome to STEMelix! Start your learning journey today.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 10px; overflow: hidden;">
          <!-- Logo -->
          <div style="background: #4f46e5; padding: 20px; text-align: center;">
            <img src="https://stemelix.com/images/stemelix-email-logo.jpg" alt="stemelix Logo" style="height: 50px;" />
          </div>

          <!-- Content -->
          <div style="padding: 20px;">
            <h2 style="color: #333;">Welcome to STEMelix, ${name || "Learner"} 👋</h2>
            <p style="font-size: 16px; color: #555;">
              We’re thrilled to have you on board! 🚀  
              Get ready to explore amazing courses and start your learning journey.
            </p>

            <!-- Button -->
            <a href="https://stemelix.com/" 
               style="display: inline-block; background: #4f46e5; color: #fff; padding: 12px 20px; border-radius: 6px; text-decoration: none; margin-top: 20px;">
              Start Learning
            </a>
          </div>

          <!-- Footer -->
          <div style="background: #f9f9f9; padding: 15px; text-align: center; font-size: 13px; color: #888;">
            <p>Need help? Contact us at <a href="mailto:info.stemelix@gmail.com">support@Stemelix.com</a></p>
            <p>&copy; ${new Date().getFullYear()} Stemelix. All rights reserved.</p>
          </div>
        </div>
      `,
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
    const { to, invoicePdf, orderId } = req.body;
    await sendEmail({
      to,
      subject: "Your Invoice from STEMelix",
      attachments: [{
        filename: `invoice_${orderId}.pdf`,
        content: Buffer.from(invoicePdf, 'base64'),
        contentType: 'application/pdf'
      }],
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your Invoice</h2>
          <p>Thank you for your payment. Your invoice is attached to this email.</p>
          <p>Order ID: ${orderId}</p>
          <br/>
          <p>Best regards,</p>
          <p>The STEMelix Team</p>
        </div>
      `
    });
    res.json({ success: true, message: "Invoice email sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/send-meeting-link", async (req, res) => {
  try {
    const { to, meetingLink, meetingTime } = req.body;
    await sendEmail({
      to,
      subject: "Your Meeting Link from STEMelix",
      text: `Your meeting is scheduled at ${meetingTime}. Join using this link: ${meetingLink}`,
      html: `<h2>Your Meeting Link</h2><p>Your meeting is scheduled at <strong>${meetingTime}</strong>.</p><p>Join using this link: <a href="${meetingLink}">${meetingLink}</a></p>`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
export default router;
