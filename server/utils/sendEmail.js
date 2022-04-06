const nodemailer = require('nodemailer');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

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
    const REGION = 'us-east-1';
    const sesClient = new SESClient({ region: REGION });

    const params = {
      Destination: {
        ToAddresses: [`${options.email}`],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: 'Test HTML',
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'Test SES Email',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test Email Subject',
        },
      },
      Source: 'dilt.fcfs@gmail.com', // SENDER_ADDRESS
      ReplyToAddresses: ['dilt.fcfs@gmail.com'],
    };

    await sesClient.send(new SendEmailCommand(params));
  }
};

module.exports = sendEmail;
