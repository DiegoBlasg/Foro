const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/all', async (req, res) => {
    try {
        const sql = `
        SELECT IF (p.is_anonymous = true, null, u.user_name) as user_name,
        IF (p.is_anonymous = true, null, u.email) as email,
        IF (p.is_anonymous = true, null, u.image) as image,
        IF (p.is_anonymous = true, null, u.id_user) as id_user,
        id_post, title, description, is_anonymous
        FROM posts p LEFT JOIN users u ON u.id_user = p.id_user`;

        const rows = await pool.query(sql);
        res.status(200).json({ posts: rows });
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.post('/new', async (req, res) => {
    try {
        const PROVISIONAL_ID = 6
        const { title, description, is_anonymous } = req.body;
        const sql = "INSERT INTO posts (id_user, title, description, is_anonymous) VALUES(?, ?, ?, ?)";
        const rows = await pool.query(sql, [PROVISIONAL_ID, title, description, is_anonymous]);
        res.status(200).json({ insertId: rows.insertId.toString() });
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/tags', async (req, res) => {
    try {
        const sql = "SELECT * FROM tags";
        const rows = await pool.query(sql);
        res.status(200).json({ tags: rows });
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/:post_id/tags', async (req, res) => {
    try {
        const { tags } = req.body;
        let tagsInseted = []
        tags.map(async (tagid) => {
            const sql = "INSERT INTO tags_posts VALUES(?,?)";
            const rows = await pool.query(sql, [parseInt(req.params.post_id), tagid]);
            tagsInseted.push(rows.insertId.toString())
        })

        res.status(200).json({ tags: tagsInseted });
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/:post_id/tags', async (req, res) => {
    try {
        const sql = `
        SELECT tp.id_tag, t.name, t.color 
        FROM tags_posts tp LEFT JOIN tags t ON tp.id_tag = t.id_tag 
        WHERE tp.id_post = ?`;
        const rows = await pool.query(sql, req.params.post_id);
        res.status(200).json({ tags: rows });
    } catch (error) {
        res.status(400).send(error.message)
    }
})


module.exports = router;