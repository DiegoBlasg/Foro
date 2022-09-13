const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const passportSetup = require('./passport')
const passport = require('passport');
var bodyParser = require("body-parser");


const PORT = process.env.PORT || '4000';

const app = express();


/**
 * Middleware
 */

app.use(cookieSession({
    name: "session",
    keys: [process.env.SECRET_COOCKIE_KEY],
    maxAge: 7 * 24 * 60 * 60 * 100
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json({ limit: '5000kb' }));

app.use(cors({
    origin: process.env.CLIENT_PATH || "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Routes
 */

app.use('/api/posts', require('./Routes/posts'));
app.use('/api/comments', require('./Routes/comments'));
app.use('/api/tags', require('./Routes/tags'));
app.use('/api/replies', require('./Routes/replies'))
app.use('/api/auth', require('./Routes/auth'))

/**Start listening */

app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}`)
})