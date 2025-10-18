const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  jsonTransport: true
});

module.exports = transporter;
