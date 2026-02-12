const notificationController = require('../controllers/ticket.controller');
const ticketMiddlewares = require('../middlewares/ticket.middleware');

const routes = (app) => {
    app.post(
        '/notiservice/api/v1/notifications',
        ticketMiddlewares.verifyTicketNotificationCreateRequest,
        notificationController.createTicket
    );

    app.get(
        '/notiservice/api/v1/notifications/:id',
        notificationController.getTickets
    );

    app.get(
        '/notiservice/api/v1/notifications',
        notificationController.getAllTickets
    );
}

module.exports = routes;