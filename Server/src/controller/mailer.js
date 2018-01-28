import nodemailer from 'nodemailer';

const setup = () => nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

const from = '"Chuks Recipes" <info@chuksrecipes.com';

const sendResetPasswordEmail = (user) => {
  const transport = setup();
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
  transport.sendMail(email);
};

export default sendResetPasswordEmail;
