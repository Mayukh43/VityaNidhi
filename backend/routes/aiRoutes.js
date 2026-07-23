const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {

    getRecommendations,
    chatWithAI,
    verifyApplicationWithAI,
    compareScholarships

} = require("../controllers/aiController");

// ======================================
// AI Recommendation
// GET /api/ai/recommendations
// ======================================

router.get(

    "/recommendations",

    authMiddleware,

    getRecommendations

);

// ======================================
// AI Chatbot
// POST /api/ai/chat
// ======================================

router.post(

    "/chat",

    authMiddleware,

    chatWithAI

);

// ======================================
// AI Eligibility Verification
// POST /api/ai/verify/:applicationId
// (Admin Only)
// ======================================

router.post(

    "/verify/:applicationId",

    authMiddleware,

    adminMiddleware,

    verifyApplicationWithAI

);

// ======================================
// AI Scholarship Comparison
// POST /api/ai/compare
// ======================================

router.post(

    "/compare",

    authMiddleware,

    compareScholarships

);

module.exports = router;