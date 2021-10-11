# Face Detector and Scorer Backend API
A project based on the Zero to Mastery Udemy course. The app provides security, login and signup feature, detect faces, and finding faces using machine learning.

## Installation
1. Clone this repo
2. Run `npm install`
3. Run `npm start`
4. You must add your own API key in the `controllers/image.js` file to connect to Clarifai API.
5. Add your own `.env` file with the necessary variables for this to fully work.

## Core Mechanics
**RESTful** Backend API
1. **Based on** *Node.js*
2. Uses the *Express* **framework**
3. **Logging** with *winston*
4. *Postgres* as **database**
5. Password **security** with *bcrypt*
6. **Machine Learning** with *Clarifai* 
7. **Sensitive data protection** with *Environment Variables*

## Dependencies

    "bcrypt-nodejs": "0.0.3",
    "body-parser": "^1.18.2",
    "clarifai": "^2.5.0",
    "cors": "^2.8.4",
    "dotenv": "^6.0.0",
    "express": "^4.16.2",
    "knex": "^0.14.2",
    "pg": "^7.4.0",
    "winston": "^3.1.0"
    
### Dev

    "@types/express": "^4.16.0",
    "nodemon": "^1.12.7"
