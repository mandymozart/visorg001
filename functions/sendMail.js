const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const transporter = nodemailer.createTransport(
  mg({
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  }),
);

exports.handler = async function (event) {
  const { content, type, destination } = JSON.parse(event.body);
  console.log(`Sending report to ${destination}`);

  const info = await transporter.sendMail({
    from: process.env.MAILGUN_SENDER,
    to: destination,
    subject: `Order confirmation! (${type})`,
    text: `We got your order.${JSON.stringify(content)}`,
  });

  console.log(`Report sent: ${info.messageId}`);
};