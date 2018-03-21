import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_user: process.env.SENDGRID_API_USER,
    api_key: process.env.SENDGRID_API_PASSWORD
  }
}));

const from = '"Chuks Recipes" <info@chuksrecipes.com';

/**
 * @description it handles sending reset link notification to user email
 *
 * @param {object} user
 *
 * @returns {object} message
 */
const sendResetPasswordEmail = (user) => {
  const email = {
    from,
    to: user.email,
    subject: 'Reset Password',
    text: 'Hello Chuks',
    html: `
        To reset password, follow this link below
        <br/>
        <a href='${user.generateResetPasswordLink()}'/>
        ${user.generateResetPasswordLink()}
        </a>
        `,
  };
  transporter.sendMail(email, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Message sent: ${info.response}`);
    }
  });
};

export default sendResetPasswordEmail;
