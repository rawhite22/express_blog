const express = require('express');
const router = express.Router();
const {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
} = require('../controllers/blogController');

// gets homepage
router.get('/', blog_index);
// gets create blog page
router.get('/create', blog_create_get);
// sends post to database
router.post('/', blog_create_post);
// gets details page about an individual blog
router.get('/:id', blog_details);
// deletes selected blog
router.delete('/:id', blog_delete);

module.exports = router;
