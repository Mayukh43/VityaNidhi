const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },

    dateOfBirth: {
        type: Date,
        required: true,
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    state: {
        type: String,
        required: true,
    },

    district: {
        type: String,
        required: true,
    },

    currentStandard: {
        type: String,
        required: true,
    },

    highestQualification: {
        type: String,
        required: true,
    },

    institutionName: {
        type: String,
        required: true,
    },

    course: {
        type: String,
        default: "",
    },

    semester: {
        type: String,
        default: "",
    },

    percentage: {
        type: Number,
        default: 0,
    },

    cgpa: {
        type: Number,
        default: 0,
    },

    annualIncome: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        enum: ["General", "OBC", "SC", "ST", "EWS"],
        required: true,
    },

    minority: {
        type: Boolean,
        default: false,
    },

    disability: {
        type: Boolean,
        default: false,
    },

    singleGirlChild: {
        type: Boolean,
        default: false,
    },

    // =====================================
    // Uploaded Documents
    // =====================================

    documents: {

        aadhaarCard: {
            type: String,
            default: "",
        },

        incomeCertificate: {
            type: String,
            default: "",
        },

        casteCertificate: {
            type: String,
            default: "",
        },

        domicileCertificate: {
            type: String,
            default: "",
        },

        marksheet: {
            type: String,
            default: "",
        },

        disabilityCertificate: {
            type: String,
            default: "",
        }

    }

},
{
    timestamps: true,
});

module.exports = mongoose.model(
    "StudentProfile",
    studentProfileSchema
);