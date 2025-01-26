import express from "express";
<<<<<<< HEAD
import { test, updateUser, DeleteUser, getUser} from "../controller/user.controller.js";
=======
import { test, updateUser, DeleteUser, getUserListing } from "../controller/user.controller.js";
>>>>>>> 41a42f5b77b394c5e4dfde669f335e8c7c6b1d7a
const router = express.Router();

import { verifyToken } from "../utils/verifyUser.js";

router.get('/test',test);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, DeleteUser)
<<<<<<< HEAD
router.get('/:id', verifyToken, getUser);

=======
router.get('/listing/:id', verifyToken, getUserListing)
>>>>>>> 41a42f5b77b394c5e4dfde669f335e8c7c6b1d7a


export default router;