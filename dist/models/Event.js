"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const SpeakerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    avatar: { type: String, required: true },
});
const AgendaItemSchema = new mongoose_1.Schema({
    time: { type: String, required: true },
    topic: { type: String, required: true },
    speaker: { type: String, required: true },
});
const EventSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Please provide an event title'],
        trim: true,
        maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a detailed event description'],
    },
    shortDescription: {
        type: String,
        required: [true, 'Please provide a short summary description'],
        maxlength: [200, 'Short description cannot exceed 200 characters'],
    },
    category: {
        type: String,
        required: [true, 'Please specify an event category'],
        index: true,
    },
    price: {
        type: Number,
        required: [true, 'Please specify a ticket price (0 for free)'],
        min: [0, 'Price cannot be negative'],
        index: true,
    },
    date: {
        type: Date,
        required: [true, 'Please provide event start date'],
        index: true,
    },
    endDate: {
        type: Date,
    },
    time: {
        type: String,
        required: [true, 'Please provide event time schedule (e.g. 09:00 AM - 05:00 PM EST)'],
    },
    location: {
        type: String,
        required: [true, 'Please provide venue location or "Virtual Online"'],
    },
    isVirtual: {
        type: Boolean,
        default: false,
    },
    images: {
        type: [String],
        validate: {
            validator: function (val) {
                return val && val.length > 0;
            },
            message: 'At least one image is required for gallery',
        },
    },
    featuredImage: {
        type: String,
        required: [true, 'Please provide a primary cover image'],
    },
    capacity: {
        type: Number,
        required: [true, 'Please provide max event capacity'],
        min: [1, 'Capacity must be at least 1'],
    },
    ticketsSold: {
        type: Number,
        default: 0,
    },
    speakers: [SpeakerSchema],
    agenda: [AgendaItemSchema],
    rating: {
        type: Number,
        default: 4.8,
        min: 1,
        max: 5,
    },
    reviewCount: {
        type: Number,
        default: 0,
    },
    featured: {
        type: Boolean,
        default: false,
        index: true,
    },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'upcoming',
        index: true,
    },
    organizer: {
        type: String,
        default: 'EventPulse Global',
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});
// Create text index for search
EventSchema.index({ title: 'text', description: 'text', shortDescription: 'text', location: 'text' });
exports.Event = mongoose_1.default.model('Event', EventSchema);
