"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEventById = exports.getFeaturedEvents = exports.getAllEvents = void 0;
const Event_js_1 = require("../models/Event.js");
// Helper to slugify string
const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-') + '-' + Math.random().toString(36).substring(2, 7);
};
// @desc    Get all events with search, filtering, sorting, and pagination
// @route   GET /api/events
// @access  Public
const getAllEvents = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 8);
        const search = req.query.search;
        const category = req.query.category;
        const minPrice = req.query.minPrice !== undefined ? Number(req.query.minPrice) : undefined;
        const maxPrice = req.query.maxPrice !== undefined ? Number(req.query.maxPrice) : undefined;
        const isFree = req.query.isFree;
        const isVirtual = req.query.isVirtual;
        const sort = req.query.sort;
        const status = req.query.status;
        const query = {};
        // Search query across title, shortDescription, location, organizer
        if (search && search.trim() !== '') {
            const searchRegex = { $regex: search.trim(), $options: 'i' };
            query.$or = [
                { title: searchRegex },
                { shortDescription: searchRegex },
                { description: searchRegex },
                { location: searchRegex },
                { organizer: searchRegex },
            ];
        }
        // Category filter
        if (category && category !== 'All' && category !== '') {
            query.category = category;
        }
        // Price filters
        if (isFree === 'true') {
            query.price = 0;
        }
        else {
            if (minPrice !== undefined || maxPrice !== undefined) {
                query.price = {};
                if (minPrice !== undefined && !isNaN(minPrice))
                    query.price.$gte = minPrice;
                if (maxPrice !== undefined && !isNaN(maxPrice))
                    query.price.$lte = maxPrice;
            }
        }
        // Virtual / In-Person filter
        if (isVirtual === 'true') {
            query.isVirtual = true;
        }
        else if (isVirtual === 'false') {
            query.isVirtual = false;
        }
        // Status filter
        if (status && status !== 'all') {
            query.status = status;
        }
        // Sorting
        let sortOptions = { date: 1 }; // Default: closest upcoming date
        if (sort === 'price-low') {
            sortOptions = { price: 1 };
        }
        else if (sort === 'price-high') {
            sortOptions = { price: -1 };
        }
        else if (sort === 'rating') {
            sortOptions = { rating: -1, reviewCount: -1 };
        }
        else if (sort === 'newest') {
            sortOptions = { createdAt: -1 };
        }
        else if (sort === 'popular') {
            sortOptions = { ticketsSold: -1 };
        }
        const total = await Event_js_1.Event.countDocuments(query);
        const events = await Event_js_1.Event.find(query)
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(limit);
        res.status(200).json({
            success: true,
            count: events.length,
            total,
            page,
            pages: Math.ceil(total / limit) || 1,
            events,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getAllEvents = getAllEvents;
// @desc    Get featured events for landing page
// @route   GET /api/events/featured
// @access  Public
const getFeaturedEvents = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 4;
        const events = await Event_js_1.Event.find({ featured: true })
            .sort({ rating: -1, ticketsSold: -1 })
            .limit(limit);
        // If less than requested featured events, fill with top upcoming
        if (events.length < limit) {
            const additional = await Event_js_1.Event.find({ _id: { $nin: events.map((e) => e._id) } })
                .sort({ rating: -1 })
                .limit(limit - events.length);
            events.push(...additional);
        }
        res.status(200).json({
            success: true,
            count: events.length,
            events,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getFeaturedEvents = getFeaturedEvents;
// @desc    Get single event by ID or slug
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
    try {
        const id = String(req.params.id);
        let event = null;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            event = await Event_js_1.Event.findById(id);
        }
        else {
            event = await Event_js_1.Event.findOne({ slug: id });
        }
        if (!event) {
            res.status(404).json({ success: false, message: 'Event not found' });
            return;
        }
        // Get related events in same category
        const relatedEvents = await Event_js_1.Event.find({
            category: event.category,
            _id: { $ne: event._id },
        }).limit(3);
        res.status(200).json({
            success: true,
            event,
            relatedEvents,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getEventById = getEventById;
// @desc    Create a new event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res) => {
    try {
        const { title, description, shortDescription, category, price, date, endDate, time, location, isVirtual, images, featuredImage, capacity, speakers, agenda, featured, organizer, } = req.body;
        if (!title || !description || !shortDescription || !category || price === undefined || !date || !time || !location) {
            res.status(400).json({ success: false, message: 'Please provide all mandatory event fields' });
            return;
        }
        const slug = slugify(title);
        const event = await Event_js_1.Event.create({
            title,
            slug,
            description,
            shortDescription,
            category,
            price: Number(price),
            date: new Date(date),
            endDate: endDate ? new Date(endDate) : undefined,
            time,
            location,
            isVirtual: Boolean(isVirtual),
            images: images && images.length > 0 ? images : [featuredImage],
            featuredImage: featuredImage || (images && images[0]) || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
            capacity: Number(capacity) || 200,
            speakers: speakers || [],
            agenda: agenda || [],
            featured: Boolean(featured),
            organizer: organizer || 'EventPulse Global',
            createdBy: req.user?._id,
        });
        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            event,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createEvent = createEvent;
// @desc    Update an existing event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res) => {
    try {
        const event = await Event_js_1.Event.findById(req.params.id);
        if (!event) {
            res.status(404).json({ success: false, message: 'Event not found' });
            return;
        }
        const updatedEvent = await Event_js_1.Event.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            event: updatedEvent,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateEvent = updateEvent;
// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res) => {
    try {
        const event = await Event_js_1.Event.findById(req.params.id);
        if (!event) {
            res.status(404).json({ success: false, message: 'Event not found' });
            return;
        }
        await Event_js_1.Event.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Event deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteEvent = deleteEvent;
