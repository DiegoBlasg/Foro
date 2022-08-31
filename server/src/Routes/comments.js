const express = require('express');
const router = express.Router();
const { getPostComments, newPostComment, getUserComments, getNumberOfUserComments } = require('../Controllers/comments.controllers')


router.route('/post/:post_id/')
    .get(getPostComments)
    .post(newPostComment)

router.route('/user')
    .get(getUserComments)

router.route('/number/user')
    .get(getNumberOfUserComments)


module.exports = router;