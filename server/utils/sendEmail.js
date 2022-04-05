const nodemailer = require('nodemailer');
const aws = require('aws-sdk');

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
    const SES_CONFIG = {
      accessKeyId: process.env.SES_ACCESS_USER,
      secretAccessKey: process.env.SES_SECRET_KEY,
      region: process.env.SES_REGION,
    };

    aws.config.update(SES_CONFIG);
    var ses = new aws.SES();

    // AWS.config.update({ region: process.env.SES_REGION });

    var params = {
      Destination: {
        ToAddresses: ['chuckladuck91@gmail.com'],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: 'HTML Testing',
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'Testing SES email',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test email',
        },
      },
      Source: 'dilt.fcfs@gmail.com',
      ReplyToAddresses: ['dilt.fcfs@gmail.com'],
    };

    await AWS_SES.sendEmail(params).promise();
  }
};

module.exports = sendEmail;
