"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_js_1 = require("../controllers/authController.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
router.post('/register', authController_js_1.register);
router.post('/login', authController_js_1.login);
router.get('/me', auth_js_1.protect, authController_js_1.getMe);
router.put('/profile', auth_js_1.protect, authController_js_1.updateProfile);
router.put('/password', auth_js_1.protect, authController_js_1.updatePassword);
// Admin user management routes
router.get('/users', auth_js_1.protect, (0, auth_js_1.authorize)('admin'), authController_js_1.getAllUsers);
router.put('/users/:id/role', auth_js_1.protect, (0, auth_js_1.authorize)('admin'), authController_js_1.updateUserRole);
router.delete('/users/:id', auth_js_1.protect, (0, auth_js_1.authorize)('admin'), authController_js_1.deleteUser);
exports.default = router;
