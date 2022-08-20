const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: '.env-local' });

const PORT = process.env.PORT || '4000';

const app = express();


/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Routes
 */

app.use('/user', require('./routes/user'));

/**Start listening */
app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}`)
})