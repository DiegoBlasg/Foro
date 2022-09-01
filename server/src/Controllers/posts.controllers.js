const pool = require('../database');

const contractsCtrl = {};
const POSTS_PER_PAGE = 10

contractsCtrl.getPosts = async (req, res) => {
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
        const sql = `
        SELECT IF (p.is_anonymous = true, null, u.user_name) as user_name,
        IF (p.is_anonymous = true, null, u.email) as email,
        IF (p.is_anonymous = true, null, u.user_image) as user_image,
        p.id_post, p.title, p.description, p.is_anonymous, p.created_at, p.number_of_comments
        FROM posts p LEFT JOIN users u ON u.email = p.email
        WHERE p.title LIKE '%${req.query.search || ''}%' AND ${string.substring(0, string.length - 5)}
        ORDER BY p.created_at DESC, p.id_post DESC
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

        res.status(200).json({ posts: ress });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

contractsCtrl.getSinglePost = async (req, res) => {
    try {
        const sql = `
        SELECT IF (p.is_anonymous = true, null, u.user_name) as user_name,
        p.email,
        IF (p.is_anonymous = true, null, u.user_image) as user_image,
        id_post, title, description, is_anonymous, created_at
        FROM posts p LEFT JOIN users u ON u.email = p.email
        WHERE id_post = ?`;
        const rows = await pool.query(sql, req.params.id_post);

        const sql2 = `
        SELECT tp.id_tag, tp.id_post, t.name, t.color 
        FROM tags_posts tp LEFT JOIN tags t ON tp.id_tag = t.id_tag`;
        const rows2 = await pool.query(sql2, req.params.post_id);

        rows[0].tags = []
        rows2.map(tag => {
            if (tag.id_post == rows[0].id_post) {
                rows[0].tags.push(tag)
            }
        })
        const USER_EMAIL = req.session.passport.user.emails[0].value
        rows[0].is_owner = rows[0].email == USER_EMAIL ? true : false
        rows[0].email = rows[0].is_anonymous ? null : rows[0].email
        res.status(200).json({ post: rows[0] });
    } catch (error) {
        res.status(400).send(error.message)
    }
}
contractsCtrl.newPost = async (req, res) => {
    try {
        const { title, description, is_anonymous } = req.body;
        const sql = "INSERT INTO posts (email, title, description, is_anonymous, created_at, number_of_comments) VALUES(?, ?, ?, ?, NOW(), 0)";
        const rows = await pool.query(sql, [req.session.passport.user.emails[0].value, title, description, is_anonymous]);
        res.status(200).json({ insertId: rows.insertId.toString() });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

contractsCtrl.deletePost = async (req, res) => {
    try {
        const sql = "DELETE FROM posts WHERE id_post = ? AND email = ?";
        await pool.query(sql, [req.params.id_post, req.session.passport.user.emails[0].value]);
        res.status(200).json({ post: "deleted" });
    } catch (error) {
        res.status(400).send(error.message)
    }
}
contractsCtrl.updatePost = async (req, res) => {
    try {
        const { title, description, is_anonymous, tags } = req.body;
        const sql = "UPDATE posts SET title = ?, description = ?, is_anonymous = ? WHERE id_post = ? AND email = ?";
        const rows = await pool.query(sql, [title, description, is_anonymous, req.params.id_post, req.session.passport.user.emails[0].value]);
        if (tags.length <= 0) {
            const sql = "DELETE FROM tags_posts WHERE id_post = ?";
            await pool.query(sql, req.params.id_post);
        }
        tags.map(async (tag) => {
            const sql = `
            SELECT tp.id_tag
            FROM tags_posts tp LEFT JOIN tags t ON tp.id_tag = t.id_tag
                LEFT JOIN posts p ON tp.id_post = p.id_post
            WHERE p.id_post = ? AND p.email = ?`;
            const rows = await pool.query(sql, [req.params.id_post, req.session.passport.user.emails[0].value]);
            if (!rows.some(e => e.id_tag === tag)) {
                const sql = "INSERT INTO tags_posts VALUES(?,?)";
                await pool.query(sql, [req.params.id_post, tag]);
            }
            rows.map(async (tag) => {
                if (!tags.includes(tag.id_tag)) {
                    const sql = "DELETE FROM tags_posts WHERE id_tag = ?";
                    await pool.query(sql, tag.id_tag);
                }
            })
        })
        res.status(200).json({ insertId: rows.insertId.toString() });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

contractsCtrl.getUserPosts = async (req, res) => {
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
        const sql = `
        SELECT p.id_post, p.title, p.description, p.is_anonymous, p.created_at, p.number_of_comments,
        IF (p.is_anonymous = true, null, u.email) as email,
        IF (p.is_anonymous = true, null, u.user_image) as user_image,
        IF (p.is_anonymous = true, null, u.user_name) as user_name
        FROM posts p LEFT JOIN users u ON u.email = p.email 
        WHERE u.email = '${req.session.passport.user.emails[0].value}'
            AND p.title LIKE '%${req.query.search || ''}%' 
            AND ${string.substring(0, string.length - 5)}
        ORDER BY p.created_at DESC, p.id_post DESC
        LIMIT ${req.query.page * POSTS_PER_PAGE}, ${POSTS_PER_PAGE}`;
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

        res.status(200).json({ posts: ress });
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

module.exports = contractsCtrl;