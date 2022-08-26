const pool = require('../database');

const contractsCtrl = {};

contractsCtrl.getUserPosts = async (req, res) => {
    try {
        const sql = `
        SELECT p.id_post, p.title, p.description, p.is_anonymous, p.created_at, 
        IF (p.is_anonymous = true, null, u.email) as email,
        IF (p.is_anonymous = true, null, u.user_image) as user_image,
        IF (p.is_anonymous = true, null, u.user_name) as user_name
        FROM posts p LEFT JOIN users u ON u.email = p.email 
        WHERE u.email = ?
        ORDER BY p.created_at DESC, p.id_post DESC
        LIMIT ?, 10`;
        const rows = await pool.query(sql, [req.session.passport.user.emails[0].value, parseInt(req.params.pag)]);
        res.status(200).json({ posts: rows });
    } catch (error) {
        res.status(400).send(error.message)
    }
}
contractsCtrl.getNumberOfUserPosts = async (req, res) => {
    try {
        const sql = `SELECT COUNT(id_post) as post FROM posts WHERE email = ?`;
        const rows = await pool.query(sql, req.session.passport.user.emails[0].value);
        res.status(200).json({ numberOfPosts: rows[0].post.toString() });
    } catch (error) {
        res.status(400).send(error.message)
    }
}
contractsCtrl.getUserComments = async (req, res) => {
    try {
        const sql = `
        SELECT c.id_comment, c.content, c.created_at, c.is_anonymous, c.id_post, 
        IF(c.is_anonymous = true, null, u.email) as email, 
        IF(c.is_anonymous = true, null, u.user_name) as user_name, 
        IF(c.is_anonymous = true, null, u.user_image) as user_image
        FROM comments c LEFT JOIN users u ON u.email = c.email
        WHERE u.email = ?
        ORDER BY c.created_at DESC, c.id_comment DESC
        LIMIT ?, 10`;
        const rows = await pool.query(sql, [req.session.passport.user.emails[0].value, parseInt(req.params.pag)]);
        res.status(200).json({ comments: rows });
    } catch (error) {
        res.status(400).send(error.message)
    }
}
contractsCtrl.getNumberOfUserComments = async (req, res) => {
    try {
        const sql = `SELECT COUNT(id_comment) as comment FROM comments WHERE email = ?`;
        const rows = await pool.query(sql, req.session.passport.user.emails[0].value);
        res.status(200).json({ numberOfComments: rows[0].comment.toString() });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = contractsCtrl;