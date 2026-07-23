const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {

    applyScholarship,
    getMyApplications,
    getAllApplications,
    getApplicationDetails,
    updateApplicationStatus,
    verifyApplication

} = require("../controllers/applicationController");

// ======================================
// Student Apply for Scholarship
// POST /api/applications
// ======================================

router.post(
    "/",
    protect,
    applyScholarship
);

// ======================================
// Student View Own Applications
// GET /api/applications/my
// ======================================

router.get(
    "/my",
    protect,
    getMyApplications
);

// ======================================
// Admin View All Applications
// GET /api/applications
// ======================================

router.get(
    "/",
    protect,
    admin,
    getAllApplications
);

// ======================================
// Admin View Single Application
// GET /api/applications/:id
// ======================================

router.get(
    "/:id",
    protect,
    admin,
    getApplicationDetails
);

// ======================================
// Admin Update Application Status
// PUT /api/applications/:id/status
// ======================================

router.put(
    "/:id/status",
    protect,
    admin,
    updateApplicationStatus
);

// ======================================
// Admin Verify Student Documents
// PUT /api/applications/:id/verify
// ======================================

router.put(
    "/:id/verify",
    protect,
    admin,
    verifyApplication
);

module.exports = router;