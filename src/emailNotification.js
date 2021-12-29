let nodemailer = require('nodemailer');

const sendEmail = (email, message) => {
    if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
        console.log(
            'EMAIL or EMAIL_PASSWORD is null. Please verify you have a .env file!'
        );
        process.exit(1);
    }
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'COVID Result Posted!',
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
