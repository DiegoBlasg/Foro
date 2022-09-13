const router = require('express').Router()
const passport = require('passport')
const pool = require('../database')
if (process.env.NODE_ENV != "production") require('dotenv').config({ path: '.env.local' });
const CLIENT_URL = process.env.CLIENT_PATH

router.get("/login/failed", (req, res) => {
    res.status(401).json({ success: false, message: "failure" })
})

router.get("/login/success", async (req, res) => {
    try {
        if (req.user) {
            const userEmail = req.user.emails[0].value
            const sql1 = 'SELECT * FROM users WHERE email = ?';
            const user = await pool.query(sql1, userEmail);
            if (user.length) {
                req.user.is_admin = user[0].is_admin
                if (user[0].image != req.user.photos[0].value) {
                    const sql = "UPDATE users SET user_image = ? WHERE email = ?";
                    await pool.query(sql, [req.user.photos[0].value, user[0].email]);
                }
                if (user[0].user_name != req.user.displayName) {
                    const sql = "UPDATE users SET user_name = ? WHERE email = ?";
                    await pool.query(sql, [req.user.displayName, user[0].email]);

                }
            } else {
                req.user.is_admin = false
                const sql = "INSERT INTO users (email, is_admin, user_image, user_name) VALUES(?, false, ?, ?)";
                await pool.query(sql, [userEmail, req.user.photos[0].value, req.user.displayName]);
            }
            res.status(200).json({ success: true, message: "successfull", user: req.user })
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get("/logout", (req, res) => {
    req.logOut()
    res.redirect(CLIENT_URL)

})
router.get("/google", passport.authenticate("google", { scope: ['profile', 'email'] }));

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
}))

module.exports = router