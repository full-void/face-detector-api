require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const {logger} = require('./logger');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_LINK
    }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("API is working.");
});
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt)
});
app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, db)
});
app.put('/image', (req, res) => {
    image.handleImage(req, res, db)
});
app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res)
});

app.listen(process.env.PORT, () => {
    logger.info(`The server has started at port ${process.env.PORT}`);
});
