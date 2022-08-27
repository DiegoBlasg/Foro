const express = require('express');
const router = express.Router();
const { getTags, newPostTags } = require('../Controllers/tags.controllers')

router.route('/')
    .get(getTags)

router.route('/post/:post_id')
    .post(newPostTags)

module.exports = router;