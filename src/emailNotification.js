let nodemailer = require('nodemailer');

const sendEmail = (email, password, message) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: password,
        },
    });

    let mailOptions = {
        from: email,
        to: email,
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
