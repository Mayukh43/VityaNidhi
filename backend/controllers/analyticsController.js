const User = require("../models/User");
const Scholarship = require("../models/Scholarship");
const Application = require("../models/Application");

// ======================================
// Admin Analytics Dashboard
// GET /api/analytics
// ======================================

const getAnalytics = async (req, res) => {

    try {

        // ===============================
        // Total Students
        // ===============================

        const totalStudents = await User.countDocuments({

            role: "student"

        });

        // ===============================
        // Total Scholarships
        // ===============================

        const totalScholarships = await Scholarship.countDocuments();

        // ===============================
        // Total Applications
        // ===============================

        const totalApplications = await Application.countDocuments();

        // ===============================
        // Pending Applications
        // ===============================

        const pending = await Application.countDocuments({

            status: "Pending"

        });

        // ===============================
        // Approved Applications
        // ===============================

        const approved = await Application.countDocuments({

            status: "Approved"

        });

        // ===============================
        // Rejected Applications
        // ===============================

        const rejected = await Application.countDocuments({

            status: "Rejected"

        });

        // ===============================
        // Under Review Applications
        // ===============================

        const underReview = await Application.countDocuments({

            status: "Under Review"

        });
                // ===============================
        // Applications Per Scholarship
        // ===============================

        const applicationsPerScholarship = await Application.aggregate([

            {
                $group: {

                    _id: "$scholarship",

                    applications: {

                        $sum: 1

                    }

                }

            },

            {
                $lookup: {

                    from: "scholarships",

                    localField: "_id",

                    foreignField: "_id",

                    as: "scholarship"

                }

            },

            {
                $unwind: "$scholarship"

            },

            {
                $project: {

                    _id: 0,

                    scholarshipName: "$scholarship.scholarshipName",

                    applications: 1

                }

            },

            {
                $sort: {

                    applications: -1

                }

            }

        ]);

        // ===============================
        // Send Analytics Data
        // ===============================

        res.status(200).json({

            totalStudents,

            totalScholarships,

            totalApplications,

            pending,

            approved,

            rejected,

            underReview,

            applicationsPerScholarship

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getAnalytics

};