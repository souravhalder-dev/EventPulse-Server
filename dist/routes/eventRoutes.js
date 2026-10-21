"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_js_1 = require("../controllers/eventController.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
router.get('/', eventController_js_1.getAllEvents);
router.get('/featured', eventController_js_1.getFeaturedEvents);
router.get('/:id', eventController_js_1.getEventById);
// Admin-only management routes
router.post('/', auth_js_1.protect, (0, auth_js_1.authorize)('admin'), eventController_js_1.createEvent);
router.put('/:id', auth_js_1.protect, (0, auth_js_1.authorize)('admin'), eventController_js_1.updateEvent);
router.delete('/:id', auth_js_1.protect, (0, auth_js_1.authorize)('admin'), eventController_js_1.deleteEvent);
exports.default = router;
