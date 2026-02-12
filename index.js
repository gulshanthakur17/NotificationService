const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');

const Cron = require('./crons/cron');

const app = express();

const TicketRoutes = require('./routes/ticket.routes');

env.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

TicketRoutes(app);

app.listen(process.env.PORT, async () => {
    console.log(`Server Started on Port ${process.env.PORT} !!`);
    
    try {
        await mongoose.connect(process.env.DB_URL); // connected to mongo server
        console.log("Successfully Connected to mongoose");
    } catch (error) {
        console.log("Not able to connect mongoose", error);    
    }

    Cron.mailerCron();
});