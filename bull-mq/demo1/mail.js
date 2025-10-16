import nodemailer from "nodemailer";
import { Worker } from "bullmq";
import connection from "./redis-client.js"
import config from "./config.js";


const transporter = nodemailer.createTransport({
   host: config.mailService.host,
  port: config.mailService.port,
  secure: false,
  auth: {
    user: config.mailService.userName,
    pass: config.mailService.passWord,
  },
});

const emailTemplate = (body, title = "Notification") => `
  <div style="font-family: Arial, sans-serif; line-height:1.5;">
    <h2>${title}</h2>
    <p>${body}</p>
  </div>
`;

// Initialize worker
const worker = new Worker(
  "email-queue",
  async (job) => {
    try {
      console.log(1);

      const { to, subject, text, html } = job.data;

      if (!to || !subject || (!text && !html)) {
        throw new Error("Missing required email fields");
      }

      const mailOptions = {
        from: config.mailService.userName,
        to,
        subject,
        text: text || undefined,
        html: html || (text ? emailTemplate(text, subject) : undefined),
      };
      

       const info = await transporter.sendMail(mailOptions);
      // const info = await transporter.sendMail(mailOptions);

      console.log(`[Email Worker] ✅ Email sent to ${to}: ${info.messageId}`);
    } catch (error) {
      console.error(`[Email Worker] ❌ Failed to send email for job ${job.id}:`, error);
    }
  },
  { connection: connection } // Redis connection from config
);

export default worker;
