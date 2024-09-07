import express from 'express';
import { register } from '../controllers/authControllers.js';

const router = express.Router();

router.post("/register", register);

export default router;