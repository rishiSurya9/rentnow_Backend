import express from "express";
import { test, updateUser } from "../controller/user.controller.js";
const router = express.Router();

import { verifyUser } from "../utils/verifyUser.js";

router.get('/test',test);
router.post('/update/:id', verifyUser, updateUser)



export default router;