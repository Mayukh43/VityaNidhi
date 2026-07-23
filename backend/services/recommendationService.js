const Profile = require("../models/StudentProfile");
const Scholarship = require("../models/Scholarship");

const eligibilityChecker = require("../utils/eligibilityChecker");
const calculateMatchScore = require("../utils/calculateMatchScore");

const recommendationService = async (userId) => {

    // ===============================
    // Get Student Profile
    // ===============================
    const student = await Profile.findOne({ user: userId });

    if (!student) {
        throw new Error("Student profile not found.");
    }

    // ===============================
    // Get All Scholarships
    // ===============================
    const scholarships = await Scholarship.find();

    let recommendations = [];

    // ===============================
    // Compare Every Scholarship
    // ===============================
    for (const scholarship of scholarships) {

        // Eligibility Result
        const eligibilityResult = eligibilityChecker(student, scholarship);

        // Match Score
        const scoreResult = calculateMatchScore(student, scholarship);

        recommendations.push({

            scholarshipId: scholarship._id,

            scholarshipName: scholarship.scholarshipName,

            provider: scholarship.provider,

            amount: scholarship.amount,

            eligible: eligibilityResult.eligible,

            reasons: eligibilityResult.reasons,

            score: scoreResult.score,

            matchedCriteria: scoreResult.matchedCriteria

        });

    }

    // ===============================
    // Sort by Highest Score
    // ===============================
    recommendations.sort((a, b) => b.score - a.score);

    return recommendations;

};

module.exports = recommendationService;