const express = require('express');
const router = express.Router();
const { getPosts, getSinglePost, savePost, unsavePost, getSavedPosts, deletePost, updatePost, newPost, getUserPosts, getNumberOfUserPosts } = require('../Controllers/posts.controllers')

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

router.route('/save/:id_post')
    .post(savePost)

router.route('/unsave/:id_post')
    .delete(unsavePost)

router.route('/saved')
    .get(getSavedPosts)

module.exports = router;