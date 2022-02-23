const nodemailer = require('nodemailer');

const sendEmail = async options => {
  const tpData = {
    host: process.env.SMTP_HOST_P,
    port: process.env.SMTP_PORT_P,
    user: process.env.SMTP_EMAIL_P,
    password: process.env.SMTP_PASSWORD_P,
  };

  if (process.env.NODE_ENV === 'development') {
    tpData.host = process.env.SMTP_HOST_D;
    tpData.port = process.env.SMTP_PORT_D;
    tpData.user = process.env.SMTP_EMAIL_D;
    tpData.password = process.env.SMTP_PASSWORD_D;
  }
  console.log(tpData);

  const transporter = nodemailer.createTransport({
    host: tpData.host,
    port: tpData.port,
    auth: {
      user: tpData.user,
      pass: tpData.password,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(message);
  console.log(info);
};

module.exports = sendEmail;
