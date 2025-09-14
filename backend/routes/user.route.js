import express from "express";

import { register, login, updateUser, deleteUser, getUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register/', register);
router.post('/login/', login);
router.get('/get/:id', getUser);
router.patch('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;