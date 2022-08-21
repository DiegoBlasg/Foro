const passport = require('passport')
const dotenv = require('dotenv');
const pool = require('./database')

dotenv.config({ path: '.env.local' });

const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    const userEmail = profile.emails[0].value
    const sql = 'SELECT * FROM users WHERE email = ?';
    const rows = await pool.query(sql, userEmail);
    if (!rows.length) {
        const sql = "INSERT INTO users (email, is_admin) VALUES(?, false)";
        await pool.query(sql, userEmail);
    }
    return done(null, profile)
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})