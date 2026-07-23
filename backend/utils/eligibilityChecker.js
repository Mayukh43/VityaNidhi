const eligibilityChecker = (student, scholarship) => {

    let eligible = true;
    let reasons = [];

    // ===============================
    // Category Check
    // ===============================
    if (
        scholarship.eligibleCategories &&
        scholarship.eligibleCategories.length > 0 &&
        !scholarship.eligibleCategories.includes(student.category)
    ) {
        eligible = false;
        reasons.push("Category does not match.");
    }

    // ===============================
    // State Check
    // ===============================
    if (
        scholarship.eligibleStates &&
        scholarship.eligibleStates.length > 0 &&
        !scholarship.eligibleStates.includes("All India") &&
        !scholarship.eligibleStates.includes(student.state)
    ) {
        eligible = false;
        reasons.push("State is not eligible.");
    }

    // ===============================
    // Gender Check
    // ===============================
    if (
        scholarship.gender &&
        scholarship.gender !== "Any" &&
        scholarship.gender !== student.gender
    ) {
        eligible = false;
        reasons.push("Gender does not match.");
    }

    // ===============================
    // Qualification Check
    // ===============================
    if (
        scholarship.minimumQualification &&
        scholarship.minimumQualification !== student.highestQualification
    ) {
        eligible = false;
        reasons.push("Required qualification not satisfied.");
    }

    // ===============================
    // Family Income Check
    // ===============================
    if (
        scholarship.maximumFamilyIncome &&
        student.annualIncome > scholarship.maximumFamilyIncome
    ) {
        eligible = false;
        reasons.push("Family income exceeds the allowed limit.");
    }

    // ===============================
    // Percentage Check
    // ===============================
    if (
        scholarship.minimumPercentage &&
        student.percentage < scholarship.minimumPercentage
    ) {
        eligible = false;
        reasons.push("Minimum percentage requirement not met.");
    }

    // ===============================
    // Age Check
    // ===============================
    if (student.dateOfBirth) {

        const today = new Date();

        let age = today.getFullYear() - new Date(student.dateOfBirth).getFullYear();

        const monthDifference =
            today.getMonth() - new Date(student.dateOfBirth).getMonth();

        if (
            monthDifference < 0 ||
            (
                monthDifference === 0 &&
                today.getDate() < new Date(student.dateOfBirth).getDate()
            )
        ) {
            age--;
        }

        if (
            scholarship.minimumAge &&
            age < scholarship.minimumAge
        ) {
            eligible = false;
            reasons.push("Minimum age requirement not met.");
        }

        if (
            scholarship.maximumAge &&
            age > scholarship.maximumAge
        ) {
            eligible = false;
            reasons.push("Maximum age exceeded.");
        }

    }

    return {

        eligible,
        reasons

    };

};

module.exports = eligibilityChecker;