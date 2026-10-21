"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_js_1 = require("../models/User.js");
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Not authorized to access this route. Please login first.',
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'eventpulse_super_secure_jwt_secret_key_2026_production');
        const user = await User_js_1.User.findById(decoded.id);
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'The user belonging to this token no longer exists.',
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        const err = error;
        if (err.name === 'TokenExpiredError') {
            res.status(401).json({
                success: false,
                message: 'Your session has expired. Please login again.',
            });
            return;
        }
        res.status(401).json({
            success: false,
            message: 'Not authorized to access this route. Invalid token.',
        });
    }
};
exports.protect = protect;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: `User role '${req.user?.role}' is not authorized to access this route. Requires [${roles.join(', ')}]`,
            });
            return;
        }
        next();
    };
};
exports.authorize = authorize;
