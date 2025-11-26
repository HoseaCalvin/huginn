import express from 'express';

import { createComment, findAllComments, findComments, updateComment, deleteComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create/:id', createComment);
router.get('/get', findAllComments);
router.get('/get/story', findComments);
router.patch('/update/:id', updateComment);
router.patch('/delete/:id', deleteComment);

export default router;