const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    auth: {
        user: "ddms@gmail.com",
        pass: "45BE6C673FE3A81068EEBDBF17DD94770915"
    }
})

message = {
    from: "mitalichougule21@gmail.com",
    to: "terkar.piyush3@gmail.com",
    subject: "Subject",
    text: "Hello Piyush! This is DDMS"
}
transporter.sendMail(message, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log('Email sent: ' + info.res);
    }
})