"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Resource not found at: ${req.originalUrl}`,
    });
};
exports.notFound = notFound;
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    // Log in development
    if (process.env.NODE_ENV !== 'production') {
        console.error('Error Details:', err);
    }
    // Mongoose bad ObjectId (CastError)
    if (err.name === 'CastError') {
        const message = 'Resource not found. Invalid ID format.';
        res.status(404).json({ success: false, message });
        return;
    }
    // Mongoose duplicate key
    if (err.code === 11000) {
        const field = err.keyValue ? Object.keys(err.keyValue)[0] : 'field';
        const message = `Duplicate value entered for ${field}. Please use another value.`;
        res.status(400).json({ success: false, message });
        return;
    }
    // Mongoose validation error
    if (err.name === 'ValidationError' && err.errors) {
        const messages = Object.values(err.errors).map((val) => val.message);
        res.status(400).json({ success: false, message: messages.join('. ') });
        return;
    }
    const statusCode = error.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);
    res.status(statusCode).json({
        success: false,
        message: error.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
exports.errorHandler = errorHandler;
