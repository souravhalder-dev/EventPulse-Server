"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statsController_js_1 = require("../controllers/statsController.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
router.get('/public', statsController_js_1.getPublicStats);
router.get('/admin', auth_js_1.protect, (0, auth_js_1.authorize)('admin'), statsController_js_1.getAdminAnalytics);
exports.default = router;
