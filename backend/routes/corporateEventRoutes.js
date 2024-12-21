import express from 'express';
import {
    createCorporateEvent,
    getCorporateEvents,
    approveCorporateEvent,
    declineCorporateEvent,
    checkEventConflict
} from '../controllers/corporateEventcontroller.js';

const router = express.Router();

// Routes for corporate events
router.post('/', createCorporateEvent); // Create a new corporate event without image handling
router.get('/', getCorporateEvents); // Get all corporate events
router.put('/:id/approve', approveCorporateEvent); // Approve an event
router.put('/:id/decline', declineCorporateEvent); // Decline an event
router.get('/check-conflict', checkEventConflict); // Check for event conflicts

export default router;