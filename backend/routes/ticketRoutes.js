// routes/ticketRoutes.js
import express from 'express';
import { createTicket, getTicketsForEvent, registerForTicket } from '../controllers/ticketController.js';

const router = express.Router();

router.post('/', createTicket); // Create a new ticket
router.get('/:eventId', getTicketsForEvent); // Get all tickets for a specific event
router.post('/register/:ticketId', registerForTicket); // Register for a specific ticket

export default router;