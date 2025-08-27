import nodemailer from "nodemailer";

// For now use Gmail SMTP (later can switch to AWS SES/SendGrid)
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or 'smtp.gmail.com'
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // App password (not normal Gmail password!)
      },
    });

    // send mail
    const info = await transporter.sendMail({
      from: `"Tinkrion Team" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html, 
    });

    console.log("✅ Email sent: ", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email error: ", error);
    throw error;
  }
};
