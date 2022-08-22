const router = require('express').Router()
const passport = require('passport')
const pool = require('../database')
const CLIENT_URL = "http://localhost:3000"

router.get("/login/failed", (req, res) => {
    res.status(401).json({ success: false, message: "failure" })
})

router.get("/login/success", async (req, res) => {
    if (req.user) {
        const userEmail = req.user.emails[0].value
        const sql = 'SELECT * FROM users WHERE email = ?';
        const rows = await pool.query(sql, userEmail);
        if (!rows.length) {
            const sql = "INSERT INTO users (email, is_admin) VALUES(?, false)";
            await pool.query(sql, userEmail);
        }
        res.status(200).json({ success: true, message: "successfull", user: req.user })
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