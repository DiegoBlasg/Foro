const express = require('express');
const router = express.Router();
const { getPosts, getNumberOfPost, getOnePost, newPost, getTags, getPostTags, newPostTags, getPostComments, newPostComment, getNumberOfCommentsOnAPost } = require('../Controllers/posts.controllers')

router.route('/')
    .post(newPost)

router.route('/number')
    .get(getNumberOfPost)

router.route('/page/:pag')
    .get(getPosts)

router.route('/:id_post')
    .get(getOnePost)

router.route('/tags/all')
    .get(getTags)

router.route('/:post_id/tags')
    .get(getPostTags)
    .post(newPostTags)

router.route('/:post_id/comments')
    .get(getPostComments)

router.route('/:post_id/comments')
    .post(newPostComment)

router.route('/:post_id/comments/number')
    .get(getNumberOfCommentsOnAPost)


module.exports = router;