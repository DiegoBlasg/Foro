const pool = require('../database');

const contractsCtrl = {};

contractsCtrl.getPosts = async (req, res) => {
    try {
        const sql = `
        SELECT IF (p.is_anonymous = true, null, u.user_name) as user_name,
        IF (p.is_anonymous = true, null, u.email) as email,
        IF (p.is_anonymous = true, null, u.user_image) as user_image,
        p.id_post, p.title, p.description, p.is_anonymous, p.created_at, p.number_of_comments
        FROM posts p LEFT JOIN users u ON u.email = p.email
        ORDER BY p.created_at DESC, p.id_post DESC
        LIMIT ?, 10`;
        const rows = await pool.query(sql, parseInt(req.params.pag));

        const sql2 = `
        SELECT tp.id_tag, tp.id_post, t.name, t.color 
        FROM tags_posts tp LEFT JOIN tags t ON tp.id_tag = t.id_tag`;
        const rows2 = await pool.query(sql2, req.params.post_id);

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
contractsCtrl.getPostsWithSearch = async (req, res) => {
    try {
        const sql = `
        SELECT IF (p.is_anonymous = true, null, u.user_name) as user_name,
        IF (p.is_anonymous = true, null, u.email) as email,
        IF (p.is_anonymous = true, null, u.user_image) as user_image,
        p.id_post, p.title, p.description, p.is_anonymous, p.created_at, p.number_of_comments
        FROM posts p LEFT JOIN users u ON u.email = p.email
        WHERE p.title LIKE ? OR p.id_post IN(
            SELECT tp.id_post
            FROM tags_posts tp LEFT JOIN tags t ON tp.id_tag  = t.id_tag 
            WHERE t.name LIKE ?
        )
        ORDER BY p.created_at DESC, p.id_post DESC
        LIMIT ?, 10`;
        const rows = await pool.query(sql, [`%${req.params.search.toString()}%`, `%${req.params.search.toString()}%`, parseInt(req.params.pag)]);
        const sql2 = `
        SELECT tp.id_tag, tp.id_post, t.name, t.color 
        FROM tags_posts tp LEFT JOIN tags t ON tp.id_tag = t.id_tag`;
        const rows2 = await pool.query(sql2, req.params.post_id);

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
contractsCtrl.getNumberOfPostWithSearch = async (req, res) => {
    try {
        const sql = `SELECT COUNT(id_post) as post FROM posts WHERE title LIKE ?`;
        const rows = await pool.query(sql, `%${req.params.search.toString()}%`);
        res.status(200).json({ numberOfPosts: rows[0].post.toString() });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

contractsCtrl.getNumberOfPost = async (req, res) => {
    try {
        const sql = `SELECT COUNT(id_post) as post FROM posts`;
        const rows = await pool.query(sql);
        res.status(200).json({ numberOfPosts: rows[0].post.toString() });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

contractsCtrl.getSinglePost = async (req, res) => {
    try {
        const sql = `
        SELECT IF (p.is_anonymous = true, null, u.user_name) as user_name,
        IF (p.is_anonymous = true, null, u.email) as email,
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

contractsCtrl.getUserPosts = async (req, res) => {
    try {
        const sql = `
        SELECT p.id_post, p.title, p.description, p.is_anonymous, p.created_at, p.number_of_comments,
        IF (p.is_anonymous = true, null, u.email) as email,
        IF (p.is_anonymous = true, null, u.user_image) as user_image,
        IF (p.is_anonymous = true, null, u.user_name) as user_name
        FROM posts p LEFT JOIN users u ON u.email = p.email 
        WHERE u.email = ?
        ORDER BY p.created_at DESC, p.id_post DESC
        LIMIT ?, 10`;
        const rows = await pool.query(sql, [req.session.passport.user.emails[0].value, parseInt(req.params.pag)]);
        const sql2 = `
        SELECT tp.id_tag, tp.id_post, t.name, t.color 
        FROM tags_posts tp LEFT JOIN tags t ON tp.id_tag = t.id_tag`;
        const rows2 = await pool.query(sql2, req.params.post_id);

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