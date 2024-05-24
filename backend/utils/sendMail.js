const nodemailer = require('nodemailer')

const sendVerificationEmail = (email, link) => {
    let smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // const linkToFrontend = `http://localhost:5173/api/verify?token=${user.verificationToken}`;

    const mailOptions = {
        to: email,
        from: "No-Reply@skyScalp.com",
        subject: "Please confirm your Email account for Sky-Scalp",
        html: "Hello Its from Sky-Scalp team!<br> Please <a href=" + link + ">Click here</a> verify your email."
    }
    // console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent Successfully ");
        }
    });
}


const sendForgotPasswordVerificationLink = (email, link) => {
    let smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // const linkToFrontend = `http://localhost:5173/api/verify?token=${user.verificationToken}`;

    const mailOptions = {
        to: email,
        from: "No-Reply@skyScalp.com",
        subject: "Request for updating password for sky-scalp",
        html: "Hello Its from Sky-Scalp team!<br> Please <a href=" + link + ">Click here</a> verify your email to proceed."

    }
    // console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent Successfully ");
        }
    });
}

module.exports = { sendVerificationEmail, sendForgotPasswordVerificationLink }