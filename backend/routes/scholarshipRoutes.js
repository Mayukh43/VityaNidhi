const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {

    createScholarship,
    getScholarships,
    getScholarshipById,
    updateScholarship,
    deleteScholarship,

} = require("../controllers/scholarshipController");

router.post("/", protect, admin, createScholarship);

router.get("/", getScholarships);

router.get("/:id", getScholarshipById);

router.put("/:id", protect, admin, updateScholarship);

router.delete("/:id", protect, admin, deleteScholarship);

module.exports = router;