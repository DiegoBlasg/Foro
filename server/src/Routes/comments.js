const express = require('express');
const router = express.Router();
const { getPostComments, newPostComment, getNumberOfCommentsOnAPost, getUserComments, getNumberOfUserComments } = require('../Controllers/comments.controllers')


router.route('/post/:post_id/')
    .get(getPostComments)
    .post(newPostComment)

router.route('/number/post/:post_id')
    .get(getNumberOfCommentsOnAPost)

router.route('/user/:pag')
    .get(getUserComments)

router.route('/number/user')
    .get(getNumberOfUserComments)


module.exports = router;