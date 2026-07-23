const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {

    createProfile,

    getProfile,

    updateProfile,

} = require("../controllers/profileController");

// ======================================
// Create Student Profile
// POST /api/profile
// ======================================

router.post(

    "/",

    protect,

    upload.fields([

        {

            name: "aadhaarCard",

            maxCount: 1

        },

        {

            name: "incomeCertificate",

            maxCount: 1

        },

        {

            name: "casteCertificate",

            maxCount: 1

        },

        {

            name: "domicileCertificate",

            maxCount: 1

        },

        {

            name: "marksheet",

            maxCount: 1

        },

        {

            name: "disabilityCertificate",

            maxCount: 1

        }

    ]),

    createProfile

);

// ======================================
// Get Student Profile
// GET /api/profile
// ======================================

router.get(

    "/",

    protect,

    getProfile

);

// ======================================
// Update Student Profile
// PUT /api/profile
// ======================================

router.put(

    "/",

    protect,

    upload.fields([

        {

            name: "aadhaarCard",

            maxCount: 1

        },

        {

            name: "incomeCertificate",

            maxCount: 1

        },

        {

            name: "casteCertificate",

            maxCount: 1

        },

        {

            name: "domicileCertificate",

            maxCount: 1

        },

        {

            name: "marksheet",

            maxCount: 1

        },

        {

            name: "disabilityCertificate",

            maxCount: 1

        }

    ]),

    updateProfile

);

module.exports = router;