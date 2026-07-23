const Application = require("../models/Application");
const Scholarship = require("../models/Scholarship");
const StudentProfile = require("../models/StudentProfile");

// ======================================
// Student Apply for Scholarship
// POST /api/applications
// ======================================

const applyScholarship = async (req, res) => {

    try {

        const { scholarship } = req.body;

        // Check Scholarship Exists
        const scholarshipExists = await Scholarship.findById(scholarship);

        if (!scholarshipExists) {

            return res.status(404).json({
                message: "Scholarship not found"
            });

        }

        // Prevent Duplicate Application
        const alreadyApplied = await Application.findOne({

            student: req.user._id,

            scholarship

        });

        if (alreadyApplied) {

            return res.status(400).json({

                message: "You have already applied for this scholarship."

            });

        }

        const application = await Application.create({

            student: req.user._id,

            scholarship

        });

        res.status(201).json({

            message: "Application submitted successfully.",

            application

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ======================================
// Student View Own Applications
// GET /api/applications/my
// ======================================

const getMyApplications = async (req, res) => {

    try {

        const applications = await Application.find({

            student: req.user._id

        })

            .populate("student", "name email")

            .populate("scholarship")

            .lean();

        res.status(200).json(applications);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ======================================
// Admin View All Applications
// GET /api/applications
// ======================================

const getAllApplications = async (req, res) => {

    try {

        const applications = await Application.find()

            .populate("student", "name email")

            .populate("scholarship")

            .populate("verifiedBy", "name email")

            .lean();

        res.status(200).json(applications);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ======================================
// Admin View Single Application Details
// GET /api/applications/:id
// ======================================

const getApplicationDetails = async (req, res) => {

    try {

        const application = await Application.findById(req.params.id)

            .populate("student", "name email")

            .populate("scholarship")

            .populate("verifiedBy", "name email")

            .lean();

        if (!application) {

            return res.status(404).json({

                message: "Application not found"

            });

        }

        const profile = await StudentProfile.findOne({

            user: application.student._id

        }).lean();

        res.status(200).json({

            application,

            profile: profile || null

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
// ======================================
// Admin Update Application Status
// PUT /api/applications/:id/status
// ======================================

const updateApplicationStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const validStatus = [

            "Pending",

            "Under Review",

            "Approved",

            "Rejected"

        ];

        if (!validStatus.includes(status)) {

            return res.status(400).json({

                message: "Invalid application status."

            });

        }

        const application = await Application.findById(req.params.id);

        if (!application) {

            return res.status(404).json({

                message: "Application not found"

            });

        }

        application.status = status;

        await application.save();

        res.status(200).json({

            message: "Application status updated successfully.",

            application

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ======================================
// Admin Verify Student Documents
// PUT /api/applications/:id/verify
// ======================================

const verifyApplication = async (req, res) => {

    try {

        const {

            verificationStatus,

            verificationRemarks

        } = req.body;

        const validStatus = [

            "Pending",

            "Verified",

            "Rejected"

        ];

        if (!validStatus.includes(verificationStatus)) {

            return res.status(400).json({

                message: "Invalid verification status."

            });

        }

        const application = await Application.findById(req.params.id);

        if (!application) {

            return res.status(404).json({

                message: "Application not found."

            });

        }

        application.verificationStatus = verificationStatus;

        application.verificationRemarks = verificationRemarks || "";

        application.verifiedBy = req.user._id;

        application.verifiedAt = new Date();

        await application.save();

        res.status(200).json({

            success: true,

            message: "Application verification updated successfully.",

            application

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// Export Controllers
// ======================================

module.exports = {

    applyScholarship,

    getMyApplications,

    getAllApplications,

    getApplicationDetails,

    updateApplicationStatus,

    verifyApplication

};