import express from 'express';

import { createStory, findStories, findUserStories, findStory, updateStory, deleteStory } from '../controllers/story.controller.js';

const router = express.Router();

router.post('/create/', createStory);
router.get('/get/', findStories);
router.get('/get/personal/', findUserStories);
router.get('/get/:id', findStory);
router.patch('/update/:id', updateStory)
router.delete('/delete/:id', deleteStory);

export default router;