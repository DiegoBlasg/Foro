const express = require('express');
const router = express.Router();
const { getReplies, updateReply } = require('../Controllers/replies.controllers')


router.route('/')
    .get(getReplies)

router.route('/:id_reply')
    .put(updateReply)


module.exports = router;