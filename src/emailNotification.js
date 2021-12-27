let nodemailer = require('nodemailer');
const config = require('../config.json');

const sendEmail = (message) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.email,
            pass: config.emailPassword,
        },
    });

    let mailOptions = {
        from: config.email,
        to: config.email,
        subject: 'COVID Results',
        text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendEmail;
