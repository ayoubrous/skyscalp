const nodemailer = require('nodemailer')
const sendVerificationEmail = (email, link) => {

    let smtpTransport = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true,
        auth: {
            user: "no-reply@skyscalp.com",
            pass: "Skyscalp#2024"
        }
    });

    const mailOptions = {
        to: email,
        from: "no-reply@skyscalp.com",
        subject: "Please confirm your Email account for Sky-Scalp",
        html: `Hello, this is from the Sky-Scalp team!<br> Please <a href="${link}">Click here</a> to verify your email.`
    };

    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent successfully.");
        }
    });
}


const sendForgotPasswordVerificationLink = (email, link) => {

    let smtpTransport = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true,
        auth: {
            user: "no-reply@skyscalp.com",
            pass: "Skyscalp#2024"
        }
    });


    // const linkToFrontend = `http://localhost:5173/api/verify?token=${user.verificationToken}`;

    const mailOptions = {
        to: email,
        from: "no-reply@skyscalp.com",
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