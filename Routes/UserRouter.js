import express from 'express';
import { deleteUser, loginUser, registerUser, updateUser } from '../controllers/Usercontrollers.js';

const router = express.Router();


router.post('register', registerUser);
router.post('/login', loginUser);
router.put('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);

export default router;