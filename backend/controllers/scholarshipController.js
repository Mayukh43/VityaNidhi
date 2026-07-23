const Scholarship = require("../models/Scholarship");

// ======================================
// Create Scholarship (Admin)
// POST /api/scholarships
// ======================================

const createScholarship = async (req, res) => {
    try {

        const scholarship = await Scholarship.create(req.body);

        res.status(201).json({
            message: "Scholarship Added Successfully",
            scholarship,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

// ======================================
// Get All Scholarships with Search & Filters
// GET /api/scholarships
// ======================================

const getScholarships = async (req, res) => {

    try {

        const {
            search,
            category,
            state,
            qualification,
            income,
            scholarshipType,
            gender
        } = req.query;

        let filter = {};

        // Search by Scholarship Name or Provider
        if (search) {
            filter.$or = [
                {
                    scholarshipName: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    provider: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        // Filter by Category
        if (category) {
            filter.eligibleCategories = category;
        }

        // Filter by State
        if (state) {
            filter.eligibleStates = state;
        }

        // Filter by Qualification
        if (qualification) {
            filter.minimumQualification = qualification;
        }

        // Filter by Scholarship Type
        if (scholarshipType) {
            filter.scholarshipType = scholarshipType;
        }

        // Filter by Gender
        if (gender) {
            filter.gender = gender;
        }

        // Filter by Family Income
        if (income) {
            filter.maximumFamilyIncome = {
                $gte: Number(income),
            };
        }

        const scholarships = await Scholarship.find(filter);

        res.status(200).json({
            total: scholarships.length,
            scholarships,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// ======================================
// Get Scholarship By ID
// GET /api/scholarships/:id
// ======================================

const getScholarshipById = async (req, res) => {

    try {

        const scholarship = await Scholarship.findById(req.params.id);

        if (!scholarship) {
            return res.status(404).json({
                message: "Scholarship Not Found",
            });
        }

        res.status(200).json(scholarship);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// ======================================
// Update Scholarship
// PUT /api/scholarships/:id
// ======================================

const updateScholarship = async (req, res) => {

    try {

        const scholarship = await Scholarship.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        if (!scholarship) {
            return res.status(404).json({
                message: "Scholarship Not Found",
            });
        }

        res.status(200).json({
            message: "Scholarship Updated Successfully",
            scholarship,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// ======================================
// Delete Scholarship
// DELETE /api/scholarships/:id
// ======================================

const deleteScholarship = async (req, res) => {

    try {

        const scholarship = await Scholarship.findById(req.params.id);

        if (!scholarship) {
            return res.status(404).json({
                message: "Scholarship Not Found",
            });
        }

        await scholarship.deleteOne();

        res.status(200).json({
            message: "Scholarship Deleted Successfully",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {
    createScholarship,
    getScholarships,
    getScholarshipById,
    updateScholarship,
    deleteScholarship,
};