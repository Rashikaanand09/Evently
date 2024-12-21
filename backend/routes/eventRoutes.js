import express from 'express';
import multer from 'multer';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../controllers/eventController.js';
// import validateEvent from '../middlewares/validateEvent.js'; // Import the validation middleware
import { Event } from '../models/createevent.js'; 
// const express = require('express');
// const multer = require('multer');
// const path = require('path');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('imageUrl'),  createEvent); // Use validation middleware
router.get('/', getEvents);
router.put('/:id', updateEvent); // Optionally validate on update
router.put('/:id', upload.single('imageUrl'), updateEvent);
router.delete('/:id', deleteEvent);

router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });
export default router;