const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

router.get('/posts', async (req, res) => {
    try {
        const sql = 'SELECT * FROM posts';
        const rows = await pool.query(sql);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.post('/newpost', async (req, res) => {
    try {
        const { title, description, is_anonymous } = req.body;
        const sql = "INSERT INTO posts (id_user, title, description, is_anonymous) VALUES(1, ?, ?, ?)";
        const rows = await pool.query(sql, [title, description, is_anonymous]);
        res.status(200).json({ insertId: rows.insertId.toString() });
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;