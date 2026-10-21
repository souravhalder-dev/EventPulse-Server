"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = require("./config/db.js");
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const eventRoutes_js_1 = __importDefault(require("./routes/eventRoutes.js"));
const bookingRoutes_js_1 = __importDefault(require("./routes/bookingRoutes.js"));
const inquiryRoutes_js_1 = __importDefault(require("./routes/inquiryRoutes.js"));
const statsRoutes_js_1 = __importDefault(require("./routes/statsRoutes.js"));
const categoryRoutes_js_1 = __importDefault(require("./routes/categoryRoutes.js"));
const errorHandler_js_1 = require("./middleware/errorHandler.js");
// Load environment variables
dotenv_1.default.config();
// Connect to MongoDB
(0, db_js_1.connectDB)();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health Check API
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'online',
        timestamp: new Date().toISOString(),
        service: 'EventPulse API',
    });
});
// Mount Routes
app.use('/api/auth', authRoutes_js_1.default);
app.use('/api/events', eventRoutes_js_1.default);
app.use('/api/bookings', bookingRoutes_js_1.default);
app.use('/api/inquiries', inquiryRoutes_js_1.default);
app.use('/api/stats', statsRoutes_js_1.default);
app.use('/api/categories', categoryRoutes_js_1.default);
// Error Handling Middleware
app.use(errorHandler_js_1.notFound);
app.use(errorHandler_js_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`[EventPulse Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
