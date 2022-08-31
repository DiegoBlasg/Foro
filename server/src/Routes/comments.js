const express = require('express');
const router = express.Router();
const { deleteComments, updateComment, getPostComments, newPostComment, getUserComments, getNumberOfUserComments, getReplyComments } = require('../Controllers/comments.controllers')


router.route('/')
    .delete(deleteComments)
    .put(updateComment)

router.route('/post/:post_id')
    .get(getPostComments)
    .post(newPostComment)

router.route('/parentcomment/:comment_id')
    .get(getReplyComments)

router.route('/user')
    .get(getUserComments)

router.route('/number/user')
    .get(getNumberOfUserComments)


module.exports = router;