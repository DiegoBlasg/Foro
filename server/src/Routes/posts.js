const express = require('express');
const router = express.Router();
const { getPosts, getSinglePost, deletePost, updatePost, newPost, getUserPosts, getNumberOfUserPosts } = require('../Controllers/posts.controllers')

router.route('/')
    .post(newPost)
    .get(getPosts)

router.route('/single/:id_post')
    .get(getSinglePost)
    .put(updatePost)
    .delete(deletePost)

router.route('/user')
    .get(getUserPosts)

router.route('/number/user')
    .get(getNumberOfUserPosts)


module.exports = router;