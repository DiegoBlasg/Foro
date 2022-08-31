const pool = require('../database');

const contractsCtrl = {};

contractsCtrl.getPostComments = async (req, res) => {
    try {
        const sql = `
        SELECT c.id_comment, c.id_post, c.content, c.created_at, c.is_anonymous, c.parent_comment_id,
	        IF (c.is_anonymous = true, null, u.email) as email,
	        IF (c.is_anonymous = true, null, u.user_image) as user_image,
	        IF (c.is_anonymous = true, null, u.user_name) as user_name
        FROM comments c LEFT JOIN users u ON c.email = u.email 
        WHERE c.parent_comment_id IS NULL AND id_post = ?`;
        const rows = await pool.query(sql, parseInt(req.params.post_id));
        const response = rows.map((com) => {
            const USER_EMAIL = req.session.passport.user.emails[0].value
            com.is_owner = com.email == USER_EMAIL ? true : false
            return com
        })
        res.status(200).json({ comments: response });
    } catch (error) {
        res.status(400).send(error.message)
    }
}
contractsCtrl.getReplyComments = async (req, res) => {
    try {
        const sql = `
        SELECT c.id_comment, c.id_post, c.content, c.created_at, c.is_anonymous, c.parent_comment_id,
	        IF (c.is_anonymous = true, null, u.email) as email,
	        IF (c.is_anonymous = true, null, u.user_image) as user_image,
	        IF (c.is_anonymous = true, null, u.user_name) as user_name
        FROM comments c LEFT JOIN users u ON c.email = u.email 
        WHERE parent_comment_id = ?`;
        const rows = await pool.query(sql, parseInt(req.params.comment_id));
        const response = rows.map((com) => {
            const USER_EMAIL = req.session.passport.user.emails[0].value
            com.is_owner = com.email == USER_EMAIL ? true : false
            return com
        })

        res.status(200).json({ comments: response });
    } catch (error) {
        res.status(400).send(error.message)
    }
}
contractsCtrl.newPostComment = async (req, res) => {
    try {
        const { content, is_anonymous, parent_comment_id } = req.body;
        const sql = "INSERT INTO comments (id_post, content, created_at, email, is_anonymous, parent_comment_id) VALUES(?,?,NOW(), ?, ?, ?)";
        const rows = await pool.query(sql, [parseInt(req.params.post_id), content, req.session.passport.user.emails[0].value, is_anonymous, parent_comment_id]);
        const sql2 = "UPDATE posts p SET p.number_of_comments = p.number_of_comments+1 WHERE p.id_post = ?";
        await pool.query(sql2, parseInt(req.params.post_id));
        res.status(200).json({ comment_id: rows.insertId.toString() });
    } catch (error) {
        res.status(400).send(error.message)
    }
}
contractsCtrl.getUserComments = async (req, res) => {
    try {
        let string = ''
        if (req.query.tag && Array.isArray(req.query.tag)) {
            req.query.tag.map(tag_id => {
                string = string + `p.id_post IN(
                SELECT tp.id_post
                FROM tags_posts tp
                WHERE tp.id_tag = ${parseInt(tag_id)}) AND `
            })
        } else if (req.query.tag) {
            string = `p.id_post IN(
                SELECT tp.id_post
                FROM tags_posts tp 
                WHERE tp.id_tag = ${parseInt(req.query.tag)}) AND `
        } else {
            string =
                '1=1 AND '
        }
        const POSTS_PER_PAGE = 10
        const sql = `
        SELECT c.id_comment, c.content, c.created_at, c.is_anonymous, c.id_post, c.parent_comment_id, 
        IF(c.is_anonymous = true, null, u.email) as email, 
        IF(c.is_anonymous = true, null, u.user_name) as user_name, 
        IF(c.is_anonymous = true, null, u.user_image) as user_image,
        IF (p.is_anonymous = true, null, u.user_name) as post_user_name,
        IF (p.is_anonymous = true, null, u.email) as post_email,
        IF (p.is_anonymous = true, null, u.user_image) as post_user_image,
        p.title, p.description, p.is_anonymous as post_is_anonymous, p.created_at as post_created_at
        FROM comments c LEFT JOIN users u ON u.email = c.email 
            LEFT JOIN posts p ON p.id_post = c.id_post 
        WHERE u.email = '${req.session.passport.user.emails[0].value}'
            AND (p.title LIKE '%${req.query.search || ''}%' OR c.content LIKE '%${req.query.search || ''}%') AND ${string.substring(0, string.length - 5)}
        ORDER BY c.created_at DESC, c.id_comment DESC
        LIMIT ${parseInt(req.query.page * POSTS_PER_PAGE)}, ${POSTS_PER_PAGE}`;
        const rows = await pool.query(sql);

        const sql2 = `
        SELECT tp.id_tag, tp.id_post, t.name, t.color 
        FROM tags_posts tp LEFT JOIN tags t ON tp.id_tag = t.id_tag`;
        const rows2 = await pool.query(sql2);

        const ress = rows.map(post => {
            post.tags = []
            rows2.map(tag => {
                if (tag.id_post == post.id_post) {
                    post.tags.push(tag)
                }
            })
            return post
        })

        res.status(200).json({ comments: rows, posts: ress });
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