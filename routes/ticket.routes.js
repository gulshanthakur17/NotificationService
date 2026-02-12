const notificationConroller = require('../controllers/ticket.controller');
const ticketMiddlewares = require('../middlewares/ticket.middleware');

const routes = (app) => {
    app.post(
        '/notiservice/api/v1/notifications',
        ticketMiddlewares.verifyTicketNotificationCreateRequest,
        notificationConroller.createTicket
    );
}

module.exports = routes;