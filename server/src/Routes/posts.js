const express = require('express');
const router = express.Router();
const { getPosts, getNumberOfPost, getNumberOfPostWithSearch, getPostsWithSearch, getSinglePost, newPost, getUserPosts, getNumberOfUserPosts } = require('../Controllers/posts.controllers')

router.route('/')
    .post(newPost)

router.route('/all/:pag')
    .get(getPosts)

router.route('/:pag/search/:search')
    .get(getPostsWithSearch)

router.route('/search/:search/number')
    .get(getNumberOfPostWithSearch)

router.route('/single/:id_post')
    .get(getSinglePost)

router.route('/number')
    .get(getNumberOfPost)

router.route('/user/:pag')
    .get(getUserPosts)

router.route('/number/user')
    .get(getNumberOfUserPosts)


module.exports = router;