const pool = require('../database');

const contractsCtrl = {};

contractsCtrl.getTags = async (req, res) => {
    try {
        const sql = "SELECT * FROM tags";
        const rows = await pool.query(sql);
        res.status(200).json({ tags: rows });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

contractsCtrl.newTag = async (req, res) => {
    try {
        const USER_EMAIL = req.session.passport.user.emails[0].value
        const { name, color } = req.body
        const sql = "SELECT is_admin FROM users WHERE email = ?";
        const rows = await pool.query(sql, USER_EMAIL);
        if (rows[0].is_admin == false) {
            throw new Error("User isn't admin")
        }
        const sql2 = "INSERT INTO tags (name, color) VALUES (?,?)";
        await pool.query(sql2, [name, color]);
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

contractsCtrl.deleteTags = async (req, res) => {
    try {
        const { tag_ids } = req.body
        const USER_EMAIL = req.session.passport.user.emails[0].value
        const sql = "SELECT is_admin FROM users WHERE email = ?";
        const rows = await pool.query(sql, USER_EMAIL);
        if (rows[0].is_admin == false) {
            throw new Error("User isn't admin")
        }
        tag_ids.map(async (id_tag) => {
            const sql = "DELETE FROM tags WHERE id_tag = ?";
            await pool.query(sql, id_tag);
        })
        res.status(200).json({ message: "success" });
    } catch (error) {
        console.log(error);
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

module.exports = contractsCtrl;