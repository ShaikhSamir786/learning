const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport(config.email.smtp);

async function sendEmail(to, subject, text, html) {
  return transporter.sendMail({
    from: config.email.from,
    to,
    subject,
    text,
    html
  });
}

module.exports = { sendEmail };
