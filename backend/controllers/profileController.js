const StudentProfile = require("../models/StudentProfile");

// ======================================
// Create Student Profile
// POST /api/profile
// ======================================

const createProfile = async (req, res) => {

    try {

        const existingProfile = await StudentProfile.findOne({
            user: req.user._id
        });

        if (existingProfile) {

            return res.status(400).json({
                message: "Profile already exists. Please update it."
            });

        }

        const documents = {

            aadhaarCard:
                req.files?.aadhaarCard?.[0]
                    ? `/uploads/aadhaar/${req.files.aadhaarCard[0].filename}`
                    : "",

            incomeCertificate:
                req.files?.incomeCertificate?.[0]
                    ? `/uploads/income/${req.files.incomeCertificate[0].filename}`
                    : "",

            casteCertificate:
                req.files?.casteCertificate?.[0]
                    ? `/uploads/caste/${req.files.casteCertificate[0].filename}`
                    : "",

            domicileCertificate:
                req.files?.domicileCertificate?.[0]
                    ? `/uploads/documents/${req.files.domicileCertificate[0].filename}`
                    : "",

            marksheet:
                req.files?.marksheet?.[0]
                    ? `/uploads/marksheet/${req.files.marksheet[0].filename}`
                    : "",

            disabilityCertificate:
                req.files?.disabilityCertificate?.[0]
                    ? `/uploads/disability/${req.files.disabilityCertificate[0].filename}`
                    : ""

        };

        const profile = await StudentProfile.create({

            user: req.user._id,

            ...req.body,

            documents

        });

        res.status(201).json({

            message: "Profile created successfully.",

            profile

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ======================================
// Get Student Profile
// GET /api/profile
// ======================================

const getProfile = async (req, res) => {

    try {

        const profile = await StudentProfile.findOne({

            user: req.user._id

        }).populate(

            "user",

            "name email"

        );

        if (!profile) {

            return res.status(404).json({

                message: "Profile not found."

            });

        }

        res.status(200).json(profile);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ======================================
// Update Student Profile
// PUT /api/profile
// ======================================

const updateProfile = async (req, res) => {

    try {

        const profile = await StudentProfile.findOne({

            user: req.user._id

        });

        if (!profile) {

            return res.status(404).json({

                message: "Profile not found."

            });

        }

        const documents = {

            ...(profile.documents || {})

        };

        if (req.files?.aadhaarCard) {

            documents.aadhaarCard =
                `/uploads/aadhaar/${req.files.aadhaarCard[0].filename}`;

        }

        if (req.files?.incomeCertificate) {

            documents.incomeCertificate =
                `/uploads/income/${req.files.incomeCertificate[0].filename}`;

        }

        if (req.files?.casteCertificate) {

            documents.casteCertificate =
                `/uploads/caste/${req.files.casteCertificate[0].filename}`;

        }

        if (req.files?.domicileCertificate) {

            documents.domicileCertificate =
                `/uploads/documents/${req.files.domicileCertificate[0].filename}`;

        }

        if (req.files?.marksheet) {

            documents.marksheet =
                `/uploads/marksheet/${req.files.marksheet[0].filename}`;

        }

        if (req.files?.disabilityCertificate) {

            documents.disabilityCertificate =
                `/uploads/disability/${req.files.disabilityCertificate[0].filename}`;

        }

        const updatedProfile = await StudentProfile.findByIdAndUpdate(

            profile._id,

            {

                ...req.body,

                documents

            },

            {

                new: true,

                runValidators: true

            }

        );

        res.status(200).json({

            message: "Profile updated successfully.",

            profile: updatedProfile

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    createProfile,

    getProfile,

    updateProfile

};