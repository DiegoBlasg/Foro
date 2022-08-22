const express = require('express');
const router = express.Router();
const { getPosts, getOnePost, newPost, getTags, getPostTags, newPostTags, getPostComments, newPostComment, getNumberOfCommentsOnAPost } = require('../Controllers/posts.controllers')

router.route('/')
    .get(getPosts)
    .post(newPost)

router.route('/:id_post')
    .get(getOnePost)

router.route('/tags/all')
    .get(getTags)

router.route('/:post_id/tags')
    .get(getPostTags)
    .post(newPostTags)

router.route('/:post_id/comments')
    .get(getPostComments)
    .post(newPostComment)

router.route('/:post_id/comments/number')
    .get(getNumberOfCommentsOnAPost)


module.exports = router;