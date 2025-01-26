import express from "express";
import { test, updateUser, DeleteUser, getUserListing , getUser} from "../controller/user.controller.js";
const router = express.Router();

import { verifyToken } from "../utils/verifyUser.js";

router.get('/test',test);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, DeleteUser)

router.get('/:id', verifyToken, getUser);
router.get('/listing/:id', verifyToken, getUserListing)




export default router;