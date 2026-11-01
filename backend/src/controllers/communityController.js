import { memoryDb } from '../utils/memoryDb.js';

export const getCommunityPosts = (req, res) => {
  const { crop, postType } = req.query;
  let posts = [...memoryDb.communityPosts];

  if (crop && crop !== 'ALL') {
    posts = posts.filter(p => p.crop.toLowerCase().includes(crop.toLowerCase()));
  }

  if (postType && postType !== 'ALL') {
    posts = posts.filter(p => p.postType === postType);
  }

  res.json({
    success: true,
    count: posts.length,
    posts
  });
};

export const getPostById = (req, res) => {
  const post = memoryDb.communityPosts.find(p => p.id === Number(req.params.id));
  if (!post) {
    return res.status(404).json({ success: false, message: 'Community question thread not found.' });
  }

  res.json({
    success: true,
    post
  });
};

export const createPost = (req, res) => {
  const { title, crop, postType, content, image } = req.body;
  const user = req.user;

  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and content are required.' });
  }

  const newPost = {
    id: Date.now(),
    authorId: user.id,
    authorName: user.fullName || user.name,
    authorRole: user.role,
    authorLocation: `${user.city || 'Nashik'}, ${user.state || 'Maharashtra'}`,
    crop: crop || 'General Crop',
    title,
    content,
    postType: postType || 'GENERAL_QUERY',
    image: image || null,
    likes: 0,
    createdAt: new Date().toLocaleString(),
    replies: []
  };

  memoryDb.communityPosts.unshift(newPost);

  res.status(201).json({
    success: true,
    message: 'Question posted to farmer community.',
    post: newPost
  });
};

export const addComment = (req, res) => {
  const { text, remedy } = req.body;
  const post = memoryDb.communityPosts.find(p => p.id === Number(req.params.id));

  if (!post) {
    return res.status(404).json({ success: false, message: 'Thread not found.' });
  }

  const reply = {
    id: Date.now(),
    authorName: req.user.fullName || req.user.name,
    isExpert: req.user.role === 'ADMIN',
    text: remedy ? `${text}\n\n[Recommended Remedy/Dosage]: ${remedy}` : text,
    createdAt: new Date().toLocaleString()
  };

  post.replies.push(reply);

  res.status(201).json({
    success: true,
    message: 'Advisory answer added.',
    reply
  });
};
