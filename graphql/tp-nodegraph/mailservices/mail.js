const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for port 465
  auth: {
    user: process.env.SMTP_USER || "samirshaikh.lwt@gmail.com",
    pass: process.env.SMTP_PASS || "tjqksckexlxegxzw", // app password
  },
});


function getHtmlTemplate({ subject, content }) {
  return `
  <!DOCTYPE html>
  <html>
  <head><meta charset="UTF-8"><title>${subject}</title></head>
  <body style="font-family:Arial, sans-serif; background:#f7f7f7; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#fff; padding:20px; border:1px solid #ccc;">
      <h2 style="color:#345C72; text-align:center;">My App</h2>
      <p style="font-size:16px; line-height:1.6;">${content}</p>
      <p style="font-size:14px; color:#999; text-align:center; margin-top:40px;">
        &copy; ${new Date().getFullYear()} My App. All rights reserved.
      </p>
    </div>
  </body>
  </html>`;
}

async function sendVerificationEmail(to, otp) {
  const subject = "Verify your email";
  const html = getHtmlTemplate({
    subject,
    content: `Your verification OTP is <b>${otp}</b>. It will expire in 10 minutes.`,
  });

  const info = await transporter.sendMail({
    from: `"My App" <${process.env.SMTP_USER}>`, // must match auth user
    to,
    subject,
    text: `Your verification OTP is ${otp}`,
    html,
  });

  return info;
}

module.exports = sendVerificationEmail;
