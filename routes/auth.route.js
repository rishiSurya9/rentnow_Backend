import express from 'express';
const router = express.Router();
import { login, signup, update } from '../controller/auth.controller.js';

router.post('/signup',signup);
router.post('/login',login);
router.post('/update',update);
export default router;
