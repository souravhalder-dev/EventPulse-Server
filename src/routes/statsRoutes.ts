import { Router } from 'express';
import { getPublicStats, getAdminAnalytics } from '../controllers/statsController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/public', getPublicStats);
router.get('/admin', protect, authorize('admin'), getAdminAnalytics);

export default router;
