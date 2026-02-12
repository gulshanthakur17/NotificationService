const cron = require('node-cron');
const Ticket = require('../models/ticketNotificationSchema');
const sendMail = require('../services/email.service');


cron.schedule('*/2 * * * *', async () => {
    const notificationToBeSent = await Ticket.find({
        status: 'PENDING'
    });

    notificationToBeSent.forEach(notification => {
        const mailData = {
            from: 'mba@support.com',
            to: notification.recepientEmails,
            subject: notification.subject,
            text: notification.content
        };
        sendMail(process.env.EMAIL, process.env.EMAIL_PASS, mailData);
    });
});