"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Category_js_1 = require("../models/Category.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
router.get('/', async (req, res) => {
    try {
        const categories = await Category_js_1.Category.find().sort({ itemCount: -1 });
        res.status(200).json({ success: true, categories });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
router.post('/', auth_js_1.protect, (0, auth_js_1.authorize)('admin'), async (req, res) => {
    try {
        const { name, description, icon } = req.body;
        if (!name) {
            res.status(400).json({ success: false, message: 'Category name is required' });
            return;
        }
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
        const category = await Category_js_1.Category.create({
            name,
            slug,
            description: description || '',
            icon: icon || 'Sparkles',
        });
        res.status(201).json({ success: true, message: 'Category created', category });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
router.delete('/:id', auth_js_1.protect, (0, auth_js_1.authorize)('admin'), async (req, res) => {
    try {
        await Category_js_1.Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Category deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.default = router;
