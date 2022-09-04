const pool = require('../database');

const contractsCtrl = {};

contractsCtrl.getReplies = async (req, res) => {
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
        const USER_EMAIL = req.session.passport.user.emails[0].value
        const sql = `
        SELECT IF (r.id_comment = null, null, c.id_comment) as id_comment,
            IF (r.id_comment = null, null, c.content) as content,
            IF (r.id_comment = null, null, c.created_at) as comment_created_at,
            IF (r.id_comment = null, null, c.is_anonymous) as comment_is_anonymous,
            IF (p.is_anonymous = true, null, p.email) as email,
            IF (p.is_anonymous = true, null, up.user_name) as user_name,
            IF (p.is_anonymous = true, null, up.user_image) as  user_image,
            p.id_post , p.title, p.description, p.is_anonymous as post_is_anonymous, p.created_at as post_created_at, p.number_of_comments,
            r.is_read, r.id_reply
        FROM replies r LEFT JOIN posts p ON p.id_post = r.id_post 
            LEFT JOIN comments c ON c.id_comment = r.id_comment
            LEFT JOIN users uc ON uc.email = c.email 
            LEFT JOIN users up ON up.email = p.email 
        WHERE ((r.id_comment IS NULL AND p.email = '${USER_EMAIL}') OR c.email = '${USER_EMAIL}')
            AND (p.title LIKE '%${req.query.search || ''}%' OR c.content LIKE '%${req.query.search || ''}%') AND ${string.substring(0, string.length - 5)}
        ORDER BY r.id_reply DESC
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
        res.status(200).json({ replies: ress });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message)
    }
}

contractsCtrl.updateReply = async (req, res) => {
    try {
        const sql = `UPDATE replies SET is_read = true WHERE id_reply = ?`;
        await pool.query(sql, [req.params.id_reply]);
        res.status(200).json({ message: "updated" });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = contractsCtrl;