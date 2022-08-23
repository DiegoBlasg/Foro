const express = require('express');
const router = express.Router();
const { getUserPosts, getUserComments } = require('../Controllers/user.controllers')

router.route('/posts')
    .get(getUserPosts)

router.route('/comments')
    .get(getUserComments)



module.exports = router;