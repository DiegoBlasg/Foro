const passport = require('passport')
const dotenv = require('dotenv');
const pool = require('../database')

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
    if (rows.length) {
        if (rows[0].image != profile.photos[0].value) {
            const sql = "UPDATE users SET image = ? WHERE id_user = ?";
            await pool.query(sql, [profile.photos[0].value, rows[0].id_user]);
        }
        if (rows[0].user_name != profile.displayName) {
            const sql = "UPDATE users SET user_name = ? WHERE id_user = ?";
            await pool.query(sql, [profile.displayName, rows[0].id_user]);

        }
    } else {
        const sql = "INSERT INTO users (email, is_admin, image, user_name) VALUES(?, false, ?, ?)";
        await pool.query(sql, [userEmail, profile.photos[0].value, profile.displayName]);
    }
    return done(null, profile)
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})