import express from 'express';
const router = express.Router();
import { google, login, signup, update } from '../controller/auth.controller.js';

router.post('/signup',signup);
router.post('/login',login);
router.post('/update',update);
router.post('/google',google);

// router.get('/google');
// router.get('/google/callback',passport.authenticate('google', { scope: ['profile', 'email'] }),authController.googleAuth);

export default router;
