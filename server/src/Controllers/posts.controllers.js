const pool = require('../database');

const contractsCtrl = {};

contractsCtrl.getPosts = async (req, res) => {
    try {
        const sql = `
        SELECT IF (p.is_anonymous = true, null, u.user_name) as user_name,
        IF (p.is_anonymous = true, null, u.email) as email,
        IF (p.is_anonymous = true, null, u.image) as image,
        IF (p.is_anonymous = true, null, u.id_user) as id_user,
        id_post, title, description, is_anonymous, created_at
        FROM posts p LEFT JOIN users u ON u.id_user = p.id_user`;

        const rows = await pool.query(sql);
        res.status(200).json({ posts: rows });
    } catch (error) {
        res.status(400).send(error.message)
    }
}
contractsCtrl.getOnePost = async (req, res) => {
    try {
        const sql = `
        SELECT IF (p.is_anonymous = true, null, u.user_name) as user_name,
        IF (p.is_anonymous = true, null, u.email) as email,
        IF (p.is_anonymous = true, null, u.image) as image,
        IF (p.is_anonymous = true, null, u.id_user) as id_user,
        id_post, title, description, is_anonymous, created_at
        FROM posts p LEFT JOIN users u ON u.id_user = p.id_user
        WHERE id_post = ?`;
        const rows = await pool.query(sql, req.params.id_post);
        res.status(200).json({ post: rows[0] });
    } catch (error) {
        res.status(400).send(error.message)
    }
}
contractsCtrl.newPost = async (req, res) => {
    try {
        const PROVISIONAL_ID = 6
        const { title, description, is_anonymous } = req.body;
        const sql = "INSERT INTO posts (id_user, title, description, is_anonymous, created_at) VALUES(?, ?, ?, ?, NOW())";
        const rows = await pool.query(sql, [PROVISIONAL_ID, title, description, is_anonymous]);
        res.status(200).json({ insertId: rows.insertId.toString() });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

contractsCtrl.getTags = async (req, res) => {
    console.log("rows");
    try {
        const sql = "SELECT * FROM tags";
        const rows = await pool.query(sql);
        console.log(rows);
        res.status(200).json({ tags: rows });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

contractsCtrl.getPostTags = async (req, res) => {
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
}

contractsCtrl.newPostTags = async (req, res) => {
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
}
contractsCtrl.getPostComments = async (req, res) => {
    try {
        const sql = `
        SELECT c.id_comment, c.id_post, c.content, c.created_at, c.is_anonymous,
	        IF (c.is_anonymous = true, null, u.email) as email,
	        IF (c.is_anonymous = true, null, u.image) as image,
	        IF (c.is_anonymous = true, null, u.id_user) as id_user,
	        IF (c.is_anonymous = true, null, u.user_name) as user_name
        FROM comments c LEFT JOIN users u ON c.id_user = u.id_user 
        WHERE id_post = ?`;
        const rows = await pool.query(sql, parseInt(req.params.post_id));
        res.status(200).json({ comments: rows });
    } catch (error) {
        res.status(400).send(error.message)
    }
}
contractsCtrl.getNumberOfCommentsOnAPost = async (req, res) => {
    try {
        const sql = "SELECT COUNT(id_comment) as comments FROM comments WHERE id_post = ?";
        const rows = await pool.query(sql, parseInt(req.params.post_id));
        res.status(200).json({ numberOfComments: rows[0].comments.toString() });
    } catch (error) {
        res.status(400).send(error.message)
    }
}
contractsCtrl.newPostComment = async (req, res) => {
    try {
        const { content, is_anonymous } = req.body;
        const sql = "INSERT INTO comments (id_post, content, created_at, id_user, is_anonymous) VALUES(?,?,NOW(), 6, ?)";
        const rows = await pool.query(sql, [parseInt(req.params.post_id), content, is_anonymous]);
        res.status(200).json({ comment_id: rows.insertId.toString() });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = contractsCtrl;