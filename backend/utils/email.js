const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  auth: {
    user: "ddms@gmail.com",
    pass: "45BE6C673FE3A81068EEBDBF17DD94770915",
  },
});

const sendMail = (email, subject, msg) => {
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
