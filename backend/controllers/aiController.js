const Profile = require("../models/StudentProfile");
const Application = require("../models/Application");
const Scholarship = require("../models/Scholarship");

const recommendationService = require("../services/recommendationService");

const {
    generateScholarshipExplanation,
    generateChatResponse,
    generateEligibilityVerification,
    generateScholarshipComparison
} = require("../services/groqService");

// ======================================
// AI Scholarship Recommendations
// GET /api/ai/recommendations
// ======================================

const getRecommendations = async (req, res) => {

    try {

        const userId = req.user._id;

        // Get Student Profile
        const student = await Profile.findOne({

            user: userId

        });

        if (!student) {

            return res.status(404).json({

                success: false,

                message: "Student profile not found."

            });

        }

        // Rule-Based Recommendation
        const recommendations = await recommendationService(userId);

        // AI Explanation
        const aiExplanation = await generateScholarshipExplanation(

            student,

            recommendations

        );

        res.status(200).json({

            success: true,

            totalRecommendations: recommendations.length,

            recommendations,

            aiExplanation

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
// AI Scholarship Chatbot
// POST /api/ai/chat
// ======================================

const chatWithAI = async (req, res) => {

    try {

        const userId = req.user._id;

        const { message } = req.body;

        if (!message) {

            return res.status(400).json({

                success: false,

                message: "Please enter your question."

            });

        }

        const student = await Profile.findOne({

            user: userId

        });

        if (!student) {

            return res.status(404).json({

                success: false,

                message: "Student profile not found."

            });

        }

        const response = await generateChatResponse(

            student,

            message

        );

        res.status(200).json({

            success: true,

            question: message,

            response

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
// AI Eligibility Verification
// POST /api/ai/verify/:applicationId
// ======================================

const verifyApplicationWithAI = async (req, res) => {

    try {

        const { applicationId } = req.params;

        const application = await Application.findById(applicationId)
            .populate("student", "name email")
            .populate("scholarship");

        if (!application) {

            return res.status(404).json({

                success: false,

                message: "Application not found."

            });

        }

        const studentProfile = await Profile.findOne({

            user: application.student._id

        });

        if (!studentProfile) {

            return res.status(404).json({

                success: false,

                message: "Student profile not found."

            });

        }

        const aiReport = await generateEligibilityVerification(

            studentProfile,

            application.scholarship

        );

        res.status(200).json({

            success: true,

            student: application.student,

            scholarship: application.scholarship,

            aiReport

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
// AI Scholarship Comparison
// POST /api/ai/compare
// ======================================

const compareScholarships = async (req, res) => {

    try {

        const { scholarship1Id, scholarship2Id } = req.body;

        if (!scholarship1Id || !scholarship2Id) {

            return res.status(400).json({

                success: false,

                message: "Please select two scholarships."

            });

        }

        const student = await Profile.findOne({

            user: req.user._id

        });

        if (!student) {

            return res.status(404).json({

                success: false,

                message: "Student profile not found."

            });

        }

        const scholarship1 = await Scholarship.findById(scholarship1Id);

        const scholarship2 = await Scholarship.findById(scholarship2Id);

        if (!scholarship1 || !scholarship2) {

            return res.status(404).json({

                success: false,

                message: "Scholarship not found."

            });

        }

        const comparison = await generateScholarshipComparison(

            student,

            scholarship1,

            scholarship2

        );

        res.status(200).json({

            success: true,

            scholarship1,

            scholarship2,

            comparison

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    getRecommendations,

    chatWithAI,

    verifyApplicationWithAI,

    compareScholarships

};