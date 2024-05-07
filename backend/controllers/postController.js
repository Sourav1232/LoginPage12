const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching posts', error: error.message });
  }
};
