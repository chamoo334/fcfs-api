const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');

const sendEmail = async options => {
  // configure AWS SDK

  let transporter;
  let message;

  if (process.env.NODE_ENV === 'development') {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST_D,
      port: process.env.SMTP_PORT_D,
      auth: {
        user: process.env.SMTP_EMAIL_D,
        pass: process.env.SMTP_PASSWORD_D,
      },
    });

    message = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };
  } else {
    // transporter = nodemailer.createTransport({
    // service: process.env.SMTP_SERVICE_P,
    // auth: {
    //   user: process.env.SMTP_USER_P,
    //   pass: process.env.SMTP_PASSWORD_P,
    // },
    // });
    transporter = nodemailer.createTransport({
      host: process.env.SES_HOST,
      auth: {
        user: process.env.SES_ACCESS_USER,
        pass: process.env.SSS_SECRET_KEY,
      },
    });

    message = {
      from: process.env.FROM_EMAIL,
      to: 'dilt.fcfs@gmail.com',
      subject: options.subject,
      text: options.message,
    };
  }

  await transporter.sendMail(message);
};

module.exports = sendEmail;
