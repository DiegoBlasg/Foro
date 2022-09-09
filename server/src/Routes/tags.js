const express = require('express');
const router = express.Router();
const { getTags, newTag, deleteTags, newPostTags } = require('../Controllers/tags.controllers')

router.route('/')
    .get(getTags)
    .post(newTag)
    .put(deleteTags)

router.route('/post/:post_id')
    .post(newPostTags)

module.exports = router;