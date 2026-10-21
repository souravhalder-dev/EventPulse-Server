import { Router } from 'express';
import {
  createInquiry,
  getAllInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from '../controllers/inquiryController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.post('/', createInquiry);
router.get('/', protect, authorize('admin'), getAllInquiries);
router.put('/:id', protect, authorize('admin'), updateInquiryStatus);
router.delete('/:id', protect, authorize('admin'), deleteInquiry);

export default router;
