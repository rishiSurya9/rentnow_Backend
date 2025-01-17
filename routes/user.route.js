import express from "express";
import { test, updateUser, DeleteUser} from "../controller/user.controller.js";
const router = express.Router();

import { verifyToken } from "../utils/verifyUser.js";

router.get('/test',test);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, DeleteUser)



export default router;