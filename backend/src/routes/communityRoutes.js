import express from 'express';
import { getCommunityPosts, getPostById, createPost, addComment } from '../controllers/communityController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/posts', getCommunityPosts);
router.get('/posts/:id', getPostById);
router.post('/posts', authMiddleware, createPost);
router.post('/posts/:id/comments', authMiddleware, addComment);

export default router;
