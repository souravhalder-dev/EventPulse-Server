import { Router, Request, Response } from 'express';
import { Category } from '../models/Category.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find().sort({ itemCount: -1 });
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
});

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, icon } = req.body;
    if (!name) {
      res.status(400).json({ success: false, message: 'Category name is required' });
      return;
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
    const category = await Category.create({
      name,
      slug,
      description: description || '',
      icon: icon || 'Sparkles',
    });

    res.status(201).json({ success: true, message: 'Category created', category });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
});

export default router;
