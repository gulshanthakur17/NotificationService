const nodemailer = require('nodemailer');

const sendMail = (userId, password) => {
    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });
    
    transport.sendMail(
        {
            from: 'mba@support.com',
            to: 'ajaykumarsah334@gmail.com',
            subject: 'Test email for nodemailer',
            text: 'Hey, this is a test email'
        }
    )
}


module.exports = sendMail;


