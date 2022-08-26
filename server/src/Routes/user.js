const express = require('express');
const router = express.Router();
const { getUserPosts, getUserComments, getNumberOfUserComments, getNumberOfUserPosts } = require('../Controllers/user.controllers')

router.route('/posts/:pag')
    .get(getUserPosts)

router.route('/comments/:pag')
    .get(getUserComments)

router.route('/number/comments')
    .get(getNumberOfUserComments)

router.route('/number/posts')
    .get(getNumberOfUserPosts)

module.exports = router;