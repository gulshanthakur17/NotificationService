const nodemailer = require('nodemailer');

const mailer = (userId, password , mailData) => {
    return nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });
    
    
}


module.exports = mailer;


