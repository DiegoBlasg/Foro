const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const passportSetup = require('./passport')
const passport = require('passport');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const PORT = process.env.PORT || '4000';

const app = express();


/**
 * Middleware
 */

app.use(cookieSession({
    name: "session",
    keys: [process.env.SECRET_COOCKIE_KEY],
    maxAge: 5 * 24 * 60 * 60 * 100
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Routes
 */

app.use('/user', require('./routes/user'));
app.use('/auth', require('./Routes/auth'))

/**Start listening */

app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}`)
})