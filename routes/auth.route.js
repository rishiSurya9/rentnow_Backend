import express from 'express';
const router = express.Router();
// import { google, login, signup } from '.auth.controller.js';
import {google, login, signup  ,signOut } from '../controller/auth.controller.js';

router.post('/signup',signup);
router.post('/login',login);
router.post('/google',google);
router.post('/singout' , signOut)

// router.post('/update',update);
// router.get('/google');
// router.get('/google/callback',passport.authenticate('google', { scope: ['profile', 'email'] }),authController.googleAuth);

export default router;
