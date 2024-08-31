import express from 'express';
import { getAdmins, getUserPerfomance } from '../controllers/management.js';


const router = express.Router();

router.get("/admins", getAdmins);
router.get("/performance/id", getUserPerfomance);


export default router;