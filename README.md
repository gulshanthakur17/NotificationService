# 📧 Notification Service - Movie Booking System

> Microservice for automated email notifications with cron-based queue processing for the Movie Booking platform.

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-8.0.1-blue.svg)](https://nodemailer.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
 
**Main Backend:** [Repo Link](https://github.com/gulshanthakur17/Movie_Booking_API_Node)

---

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Cron Configuration](#cron-configuration)

---

## 🎯 Overview

This is a **standalone microservice** that handles email notifications for the Movie Booking platform. It operates independently with its own database and processes email queues using cron jobs.

**Key Responsibilities:**
- 📬 Receive notification requests via REST API
- 📊 Store notifications in queue (MongoDB)
- ⏰ Process queue every 2 minutes using cron
- ✉️ Send emails using Nodemailer + Gmail
- 📈 Track delivery status (PENDING → SUCCESS/FAILED)

---

## ✨ Features

- ✅ **RESTful API** - Create and manage notifications
- ✅ **Cron-Based Processing** - Automated email sending every 2 minutes
- ✅ **Queue Management** - PENDING notifications processed in batches
- ✅ **Status Tracking** - Real-time notification status updates
- ✅ **Gmail Integration** - Secure email delivery via Nodemailer
- ✅ **Separate Database** - Independent MongoDB cluster
- ✅ **Microservice Architecture** - Loosely coupled from main backend
- ✅ **Production Ready** - Environment-based configuration

---

## 🔄 How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                    Notification Flow                         │
└─────────────────────────────────────────────────────────────┘

    Main Backend                Notification Service
         │                              │
         │  1. Payment Success          │
         ├─────────────────────────────▶│
         │  POST /notifications         │
         │  {                            │
         │    subject: "Booking Confirm",
         │    content: "...",           │
         │    emails: [...]             │
         │  }                            │
         │                               │
         │  2. Notification Created     │
         │◀─────────────────────────────┤
         │  Status: 201                  │
         │  {id, status: "PENDING"}     │
         │                               │
                                         │
                                         │ 3. Cron Runs (Every 2 min)
                                         ├──────────┐
                                         │          │
                                    ┌────▼────┐     │
                                    │ MongoDB │     │
                                    │ Query:  │     │
                                    │ PENDING │     │
                                    └────┬────┘     │
                                         │          │
                                         │ 4. Send  │
                                    ┌────▼────┐     │
                                    │ Gmail   │     │
                                    │ SMTP    │     │
                                    └────┬────┘     │
                                         │          │
                                         │ 5. Update│
                                    ┌────▼────┐     │
                                    │ Status: │     │
                                    │ SUCCESS │◀────┘
                                    └─────────┘
```

---

## 🛠️ Tech Stack

**Runtime & Framework**
- Node.js 18.x
- Express.js 5.2.1

**Database**
- MongoDB Atlas (Cloud)
- Mongoose 9.x

**Email Service**
- Nodemailer 8.0.1
- Gmail SMTP

**Task Scheduling**
- node-cron 4.2.1

**Development**
- Nodemon 3.x
- dotenv 17.x

---

## 🚀 Installation

### Prerequisites
- Node.js 18.x or higher
- MongoDB Atlas account
- Gmail account with App Password

### Gmail App Password Setup
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Security → 2-Step Verification (enable it)
3. Security → App Passwords
4. Generate password for "Mail"
5. Copy 16-character password

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/notification-service.git
cd notification-service
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```env
PORT=####
NODE_ENV=.....

# Database
DB_URL=mongodb....
PROD_DB_URL=mongodb cluster...

# Email Configuration
EMAIL=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
```

4. **Start the service**
```bash
npm start
# Service runs on http://localhost: ####
# Cron starts automatically
```

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Service port | `####` |
| `NODE_ENV` | Environment | `development` / `production` |
| `DB_URL` | Dev MongoDB URL | `mongodb+srv://...` |
| `PROD_DB_URL` | Prod MongoDB URL | `mongodb+srv://...` |
| `EMAIL` | Gmail address | `your-email@gmail.com` |
| `EMAIL_PASS` | Gmail app password | `.... .... .... ....` |

⚠️ **Important:** Use App Password, NOT regular Gmail password!

---

## 📡 API Endpoints

### Create Notification
```http
POST /db/api/v1/notifications
Content-Type: application/json

{
  "subject": "Booking Confirmation",
  "content": "Your booking for Inception has been confirmed!",
  "recepientEmails": ["user@example.com", "customer@test.com"]
}

Response: 201 Created
{
  "_id": "507f1f77bcf86cd799439011",
  "subject": "Booking Confirmation",
  "content": "Your booking for Inception has been confirmed!",
  "recepientEmails": ["user@example.com"],
  "status": "PENDING",
  "createdAt": "2024-02-13T10:30:00.000Z"
}
```

### Get All Notifications
```http
GET /db/api/v1/notifications
x-access-token: YOUR_JWT_TOKEN

Response: 200 OK
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "subject": "Booking Confirmation",
    "status": "SUCCESS",
    ...
  }
]
```

### Get Notifications by Status
```http
GET /db/api/v1/notifications?status=PENDING
x-access-token: YOUR_JWT_TOKEN

Response: 200 OK
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "status": "PENDING",
    ...
  }
]
```

### Get Notification by ID
```http
GET /db/api/v1/notifications/:id
x-access-token: YOUR_JWT_TOKEN

Response: 200 OK
{
  "_id": "507f1f77bcf86cd799439011",
  "subject": "Booking Confirmation",
  "status": "SUCCESS",
  ...
}
```

### Update Notification Status
```http
PATCH /db/api/v1/notifications/:id
Content-Type: application/json
x-access-token: YOUR_JWT_TOKEN

{
  "status": "FAILED"
}

Response: 200 OK
```

---

## 💾 Database Schema

### TicketNotification Model
```javascript
{
  subject: String (required),
  content: String (required),
  recepientEmails: [String] (required),
  status: Enum ["PENDING", "SUCCESS", "FAILED"] (default: "PENDING"),
  timestamps: true
}
```

**Status Lifecycle:**
```
PENDING → SUCCESS (email sent)
PENDING → FAILED (email error)
```

---

## ⏰ Cron Configuration

### Current Schedule
```javascript
// Runs every 2 minutes
cron.schedule('*/2 * * * *', async () => {
    // Process PENDING notifications
});
```

### Cron Pattern Syntax
```
 ┌────────────── minute (0 - 59)
 │ ┌──────────── hour (0 - 23)
 │ │ ┌────────── day of month (1 - 31)
 │ │ │ ┌──────── month (1 - 12)
 │ │ │ │ ┌────── day of week (0 - 6)
 │ │ │ │ │
 * * * * *
```

### Common Patterns
```javascript
'*/2 * * * *'   // Every 2 minutes
'*/5 * * * *'   // Every 5 minutes
'0 * * * *'     // Every hour
'0 0 * * *'     // Daily at midnight
'0 9 * * 1-5'   // Weekdays at 9 AM
```

### Modify Cron Schedule
Edit `/crons/cron.js`:
```javascript
// Change from every 2 minutes to every 5 minutes
cron.schedule('*/5 * * * *', async () => {
    // your code
});
```

---


## 📁 Project Structure

```
notification-service/
├── controllers/
│   └── ticket.controller.js      # Request handlers
│
├── crons/
│   └── cron.js                    # Email queue processor
│
├── middlewares/
│   └── ticket.middleware.js      # Validation
│
├── models/
│   └── ticketNotificationSchema.js  # MongoDB schema
│
├── routes/
│   └── ticket.routes.js          # API routes
│
├── services/
│   ├── email.service.js          # Nodemailer config
│   └── notification.service.js   # Business logic
│
├── utils/
│   ├── constants.js              # Status codes
│   └── responsebody.js           # Response helpers
│
├── .env                          # Environment variables
├── .gitignore
├── index.js                      # Main server + cron startup
├── package.json
└── README.md
```

## 🔗 Related Projects

- [Movie Booking Backend](https://github.com/gulshanthakur17/Movie_Booking_API_Node) - Main API service

---

**Built with ❤️ for reliable email notifications**
