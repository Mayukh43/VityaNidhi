const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema(
{
    scholarshipName: {
        type: String,
        required: true,
    },

    provider: {
        type: String,
        required: true,
    },

    scholarshipType: {
        type: String,
        enum: ["Government", "Private"],
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    minimumQualification: {
        type: String,
        required: true,
    },

    eligibleCategories: [{
        type: String,
        enum: ["General", "OBC", "SC", "ST", "EWS"],
    }],

    eligibleStates: [{
        type: String,
    }],

    gender: {
        type: String,
        enum: ["Male", "Female", "Any"],
        default: "Any",
    },

    maximumFamilyIncome: {
        type: Number,
        required: true,
    },

    minimumPercentage: {
        type: Number,
        default: 0,
    },

    minimumAge: {
        type: Number,
        default: 0,
    },

    maximumAge: {
        type: Number,
        default: 100,
    },

    applicationDeadline: {
        type: Date,
        required: true,
    },

    requiredDocuments: [{
        type: String,
    }],

    officialWebsite: {
        type: String,
        required: true,
    },

    isActive: {
        type: Boolean,
        default: true,
    }

},
{
    timestamps: true,
});

module.exports = mongoose.model("Scholarship", scholarshipSchema);