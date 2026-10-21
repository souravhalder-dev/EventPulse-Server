import { Router } from 'express';
import {
  getAllEvents,
  getFeaturedEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getAllEvents);
router.get('/featured', getFeaturedEvents);
router.get('/:id', getEventById);

// Admin-only management routes
router.post('/', protect, authorize('admin'), createEvent);
router.put('/:id', protect, authorize('admin'), updateEvent);
router.delete('/:id', protect, authorize('admin'), deleteEvent);

export default router;
