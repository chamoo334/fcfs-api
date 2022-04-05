const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');

function sesTest(emailTo, emailFrom) {
  console.log('sesTest:', emailFrom);
  const ses = new aws.SES({
    accessKeyId: process.env.SES_ACCESS_USER,
    secretAccessKey: process.env.SES_SECRET_KEY,
    region: process.env.SES_REGION,
  });

  var params = {
    Destination: {
      ToAddresses: [emailTo],
    },
    Message: {
      Body: {
        Text: { Data: 'This is a test email' },
      },

      Subject: { Data: 'From: ' + emailFrom },
    },
    Source: emailFrom,
  };

  return ses.sendEmail(params).promise();
}

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

    await transporter.sendMail(message);
  } else {
    sesTest('chuckladuck91@gmail.com', process.env.SES_FROM_EMAIL)
      .then(val => {
        console.log('got this back', val);
      })
      .catch(err => {
        console.log('There was an error!', err);
      });
  }
};

module.exports = sendEmail;
