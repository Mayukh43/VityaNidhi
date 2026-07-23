const calculateMatchScore = (student, scholarship) => {

    let score = 0;

    let matchedCriteria = [];

    // ===============================
    // Category Match (20 Marks)
    // ===============================
    if (
        scholarship.eligibleCategories &&
        scholarship.eligibleCategories.includes(student.category)
    ) {
        score += 20;
        matchedCriteria.push("Category matched");
    }

    // ===============================
    // State Match (15 Marks)
    // ===============================
    if (
        scholarship.eligibleStates &&
        (
            scholarship.eligibleStates.includes("All India") ||
            scholarship.eligibleStates.includes(student.state)
        )
    ) {
        score += 15;
        matchedCriteria.push("State matched");
    }

    // ===============================
    // Gender Match (10 Marks)
    // ===============================
    if (
        scholarship.gender === "Any" ||
        scholarship.gender === student.gender
    ) {
        score += 10;
        matchedCriteria.push("Gender matched");
    }

    // ===============================
    // Qualification Match (20 Marks)
    // ===============================
    if (
        scholarship.minimumQualification === student.highestQualification
    ) {
        score += 20;
        matchedCriteria.push("Qualification matched");
    }

    // ===============================
    // Family Income Match (20 Marks)
    // ===============================
    if (
        student.familyIncome <= scholarship.maximumFamilyIncome
    ) {
        score += 20;
        matchedCriteria.push("Income criteria satisfied");
    }

    // ===============================
    // Percentage Match (10 Marks)
    // ===============================
    if (
        student.percentage >= scholarship.minimumPercentage
    ) {
        score += 10;
        matchedCriteria.push("Percentage criteria satisfied");
    }

    // ===============================
    // Age Match (5 Marks)
    // ===============================
    if (
        student.age >= scholarship.minimumAge &&
        student.age <= scholarship.maximumAge
    ) {
        score += 5;
        matchedCriteria.push("Age matched");
    }

    return {

        score,

        matchedCriteria

    };

};

module.exports = calculateMatchScore;