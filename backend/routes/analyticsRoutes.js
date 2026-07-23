const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {

    getAnalytics

} = require("../controllers/analyticsController");

// ======================================
// Admin Analytics Dashboard
// GET /api/analytics
// ======================================

router.get(

    "/",

    authMiddleware,

    adminMiddleware,

    getAnalytics

);

module.exports = router;