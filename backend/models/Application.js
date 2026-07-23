const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
{
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    scholarship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Scholarship",
        required: true,
    },

    // ======================================
    // Application Status
    // ======================================

    status: {
        type: String,
        enum: [
            "Pending",
            "Under Review",
            "Approved",
            "Rejected"
        ],
        default: "Pending",
    },

    // ======================================
    // Admin Verification
    // ======================================

    verificationStatus: {
        type: String,
        enum: [
            "Pending",
            "Verified",
            "Rejected"
        ],
        default: "Pending",
    },

    verificationRemarks: {
        type: String,
        default: "",
    },

    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },

    verifiedAt: {
        type: Date,
        default: null,
    },

    // ======================================
    // Application Details
    // ======================================

    appliedDate: {
        type: Date,
        default: Date.now,
    },

    remarks: {
        type: String,
        default: "",
    }

},
{
    timestamps: true,
});

module.exports = mongoose.model("Application", applicationSchema);