import { Response } from 'express';
import { Booking } from '../models/Booking.js';
import { Event } from '../models/Event.js';
import { AuthRequest } from '../middleware/auth.js';

// Generate unique booking reference
const generateRef = () => {
  return 'EP-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Date.now().toString().slice(-4);
};

// @desc    Book ticket for an event
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { eventId, ticketQuantity, attendeeDetails } = req.body;

    if (!eventId) {
      res.status(400).json({ success: false, message: 'Please specify the event ID' });
      return;
    }

    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ success: false, message: 'Event not found' });
      return;
    }

    const qty = Math.max(1, Number(ticketQuantity) || 1);

    if (event.ticketsSold + qty > event.capacity) {
      res.status(400).json({
        success: false,
        message: `Only ${event.capacity - event.ticketsSold} tickets remaining for this event`,
      });
      return;
    }

    const totalAmount = event.price * qty;
    const bookingReference = generateRef();

    const booking = await Booking.create({
      user: req.user?._id,
      event: event._id,
      ticketQuantity: qty,
      totalAmount,
      bookingReference,
      attendeeDetails: {
        fullName: attendeeDetails?.fullName || req.user?.name || 'Attendee',
        email: attendeeDetails?.email || req.user?.email || '',
        company: attendeeDetails?.company || '',
        jobTitle: attendeeDetails?.jobTitle || '',
      },
    });

    // Update ticketsSold in event
    event.ticketsSold += qty;
    await event.save();

    await booking.populate('event');

    res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully! You have secured your pass.',
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Get user's personal bookings
// @route   GET /api/bookings/my
// @access  Private
export const getMyBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const bookings = await Booking.find({ user: req.user?._id })
      .populate('event')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
export const getAllBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 10);
    const search = req.query.search as string;

    const query: Record<string, any> = {};

    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .populate('user', 'name email avatar')
      .populate('event', 'title category date location price featuredImage')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      res.status(404).json({ success: false, message: 'Booking not found' });
      return;
    }

    // Check ownership or admin
    if (booking.user.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      res.status(403).json({ success: false, message: 'Not authorized to cancel this booking' });
      return;
    }

    if (booking.status === 'cancelled') {
      res.status(400).json({ success: false, message: 'Booking is already cancelled' });
      return;
    }

    booking.status = 'cancelled';
    await booking.save();

    // Release event tickets
    const event = await Event.findById(booking.event);
    if (event) {
      event.ticketsSold = Math.max(0, event.ticketsSold - booking.ticketQuantity);
      await event.save();
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
