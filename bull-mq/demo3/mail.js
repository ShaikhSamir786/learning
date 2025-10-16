import nodemailer from 'nodemailer';
import config from './config.js';

const transporter = nodemailer.createTransport({
   host: config.mailService.host,
  port: config.mailService.port,
  secure: false,
  auth: {
    user: config.mailService.userName,
    pass: config.mailService.passWord,
  },
});


export async function sendEmail(to, subject, text, html) {
  return transporter.sendMail({
    from: config.mailService.userName,
    to,
    subject,
    text,
    html
  });
}
