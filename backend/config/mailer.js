import nodemailer from "nodemailer";

// For now use Gmail SMTP (later can switch to AWS SES/SendGrid)
export const sendEmail = async ({ to, subject, text, html, attachments }) => {
  try {
    console.log("📧 Starting email send process...");
    console.log("📧 Email configuration:", {
      emailUser: process.env.EMAIL_USER ? "Set" : "Not set",
      emailPass: process.env.EMAIL_PASS ? "Set" : "Not set",
      hasAttachments: !!attachments
    });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials are not configured in environment variables");
    }

    // create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // send mail
    const info = await transporter.sendMail({
      from: `"STEMelix Team" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
      attachments,
    });

    console.log("✅ Email sent: ", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email error: ", error);
    throw error;
  }
};
