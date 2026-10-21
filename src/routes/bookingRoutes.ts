import { Router } from 'express';
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
} from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/', protect, authorize('admin'), getAllBookings);
router.put('/:id/cancel', protect, cancelBooking);

export default router;
