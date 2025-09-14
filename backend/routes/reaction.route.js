import express from 'express';

import { addReactions } from '../controllers/reaction.controller.js';

const router = express.Router();

router.post('/add/:id', addReactions);

export default router;