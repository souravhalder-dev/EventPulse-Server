import { Request, Response } from 'express';
import { Inquiry } from '../models/Inquiry.js';

// @desc    Submit a contact inquiry
// @route   POST /api/inquiries
// @access  Public
export const createInquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message, category } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400).json({
        success: false,
        message: 'Please complete all required fields (name, email, subject, message)',
      });
      return;
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
      return;
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      subject,
      message,
      category: category || 'General',
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will get back to you within 24 hours.',
      inquiry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Get all inquiries (Admin)
// @route   GET /api/inquiries
// @access  Private/Admin
export const getAllInquiries = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 10);
    const status = req.query.status as string;

    const query: Record<string, any> = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    const total = await Inquiry.countDocuments(query);
    const inquiries = await Inquiry.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
      inquiries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Update inquiry status or add notes (Admin)
// @route   PUT /api/inquiries/:id
// @access  Private/Admin
export const updateInquiryStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, adminNotes } = req.body;

    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
      return;
    }

    if (status) inquiry.status = status;
    if (adminNotes !== undefined) inquiry.adminNotes = adminNotes;

    await inquiry.save();

    res.status(200).json({
      success: true,
      message: 'Inquiry updated successfully',
      inquiry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Delete inquiry (Admin)
// @route   DELETE /api/inquiries/:id
// @access  Private/Admin
export const deleteInquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
      return;
    }

    await Inquiry.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
