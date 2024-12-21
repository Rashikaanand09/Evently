// routes/contactRoutes.js
import express from 'express';
import { createContactMessage } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', createContactMessage); // POST route for creating contact messages

export default router;