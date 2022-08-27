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