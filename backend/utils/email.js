const nodemailer = require("nodemailer");

/* Creating a transporter object which is used to send mail. */
const transporter = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  auth: {
    user: "ddms@gmail.com",
    pass: "45BE6C673FE3A81068EEBDBF17DD94770915",
  },
});

const sendMail = (email, subject, msg) => {
  /* This is the function which is used to send mail. */
  message = {
    from: "mitalichougule21@gmail.com",
    to: email,
    subject: subject,
    text: msg,
  };
  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.res);
    }
  });
};

module.exports = { sendMail };
