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
        WHERE u.email = ?`;
        const rows = await pool.query(sql, req.session.passport.user.emails[0].value);
        res.status(200).json({ posts: rows });
    } catch (error) {
        res.status(400).send(error.message)
    }
}
contractsCtrl.getUserComments = async (req, res) => {
    try {
        const sql = `
        SELECT c.id_comment, c.content, c.created_at as comment_created_at, c.is_anonymous as comment_is_anonymous, 
	        p.id_post, p.title, p.description, p.is_anonymous as post_is_anonymous, p.created_at as post_created_at,
	        IF(p.is_anonymous = true, null, u.email) as email, 
            IF(p.is_anonymous = true, null, u.user_name) as user_name, 
            IF(p.is_anonymous = true, null, u.user_image) as user_image 
        FROM comments c LEFT JOIN posts p ON p.id_post = c.id_post 
	        LEFT JOIN users u ON u.email = p.email 
        WHERE u.email = ?`;
        const rows = await pool.query(sql, req.session.passport.user.emails[0].value);
        res.status(200).json({ comments: rows });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = contractsCtrl;