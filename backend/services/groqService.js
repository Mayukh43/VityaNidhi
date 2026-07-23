const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// ======================================
// AI Scholarship Recommendation Explanation
// ======================================

const generateScholarshipExplanation = async (
    student,
    recommendations
) => {

    try {

        const prompt = `
You are an AI Scholarship Advisor.

Student Profile:

Category: ${student.category}
Gender: ${student.gender}
State: ${student.state}
Qualification: ${student.highestQualification}
Annual Income: ₹${student.annualIncome}
Percentage: ${student.percentage}

Recommended Scholarships:

${recommendations.map((item, index) => `
${index + 1}. ${item.scholarshipName}
Provider: ${item.provider}
Match Score: ${item.score}
Eligibility: ${item.eligible ? "Eligible" : "Not Eligible"}
`).join("")}

Instructions:

1. Rank the scholarships from best to worst.
2. Explain why each scholarship is suitable.
3. Mention important eligibility points.
4. Give application advice.
5. Keep the response under 300 words.
`;

        const completion = await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],

            temperature: 0.5,

            max_tokens: 500

        });

        return completion.choices[0].message.content;

    }

    catch (error) {

        console.error(error);

        return "Unable to generate AI scholarship recommendations.";

    }

};

// ======================================
// AI Scholarship Chatbot
// ======================================

const generateChatResponse = async (student, message) => {

    try {

        const prompt = `
You are an intelligent AI Scholarship Assistant.

Student Profile:

Category: ${student.category}
Gender: ${student.gender}
State: ${student.state}
Qualification: ${student.highestQualification}
Annual Income: ₹${student.annualIncome}
Percentage: ${student.percentage}

Student Question:

"${message}"

Instructions:

1. Answer the student's question clearly.
2. If the question is about scholarships, answer according to the student's profile.
3. If the student asks about eligibility, explain why they are eligible or not.
4. Mention important documents whenever appropriate.
5. If the deadline is unknown, advise the student to verify it on the official scholarship website.
6. Keep the response under 250 words.
`;

        const completion = await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],

            temperature: 0.4,

            max_tokens: 400

        });

        return completion.choices[0].message.content;

    }

    catch (error) {

        console.error(error);

        return "Sorry, I couldn't answer your question at the moment.";

    }

};

// ======================================
// AI Eligibility Verification
// ======================================

const generateEligibilityVerification = async (

    student,

    scholarship

) => {

    try {

        const prompt = `
You are an AI Scholarship Eligibility Verification Assistant.

Compare the student's profile with the scholarship requirements.

Return ONLY valid JSON.

Student Profile

Category: ${student.category}
Gender: ${student.gender}
State: ${student.state}
Qualification: ${student.highestQualification}
Institution: ${student.institutionName}
Course: ${student.course}
Current Standard: ${student.currentStandard}
Percentage: ${student.percentage}
CGPA: ${student.cgpa}
Annual Income: ${student.annualIncome}
Minority: ${student.minority}
Disability: ${student.disability}
Single Girl Child: ${student.singleGirlChild}

Scholarship Details

Scholarship Name: ${scholarship.scholarshipName}
Provider: ${scholarship.provider}
Scholarship Type: ${scholarship.scholarshipType}
Minimum Qualification: ${scholarship.minimumQualification}
Eligible Categories: ${scholarship.eligibleCategories.join(", ")}
Eligible States: ${scholarship.eligibleStates.join(", ")}
Maximum Family Income: ${scholarship.maximumFamilyIncome}
Minimum Percentage: ${scholarship.minimumPercentage}
Gender Requirement: ${scholarship.gender}

Return ONLY this JSON:

{
  "eligible": true,
  "eligibilityScore": 95,
  "checks": [
    {
      "field":"Category",
      "status":"Pass",
      "reason":"Student belongs to eligible category."
    },
    {
      "field":"Income",
      "status":"Pass",
      "reason":"Income is below the maximum limit."
    }
  ],
  "summary":"Student satisfies almost all eligibility criteria.",
  "recommendation":"Approve"
}

Do not write markdown.

Do not write explanation outside JSON.
`;

        const completion = await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [

                {

                    role: "user",

                    content: prompt

                }

            ],

            temperature: 0.2,

            response_format: {

                type: "json_object"

            },

            max_tokens: 700

        });

        return JSON.parse(

            completion.choices[0].message.content

        );

    }

    catch (error) {

        console.error(error);

        return {

            eligible: false,

            eligibilityScore: 0,

            checks: [],

            summary: "Unable to generate AI eligibility verification.",

            recommendation: "Manual Review"

        };

    }

   

};

// ======================================
// AI Scholarship Comparison
// ======================================

const generateScholarshipComparison = async (

    student,

    scholarship1,

    scholarship2

) => {

    try {

        const prompt = `
You are an AI Scholarship Advisor.

Compare the following scholarships according to the student's profile.

Student Profile

Category: ${student.category}
Gender: ${student.gender}
State: ${student.state}
Qualification: ${student.highestQualification}
Percentage: ${student.percentage}
Annual Income: ₹${student.annualIncome}

Scholarship 1

Name: ${scholarship1.scholarshipName}
Provider: ${scholarship1.provider}
Amount: ₹${scholarship1.amount}
Minimum Qualification: ${scholarship1.minimumQualification}
Minimum Percentage: ${scholarship1.minimumPercentage}
Maximum Family Income: ₹${scholarship1.maximumFamilyIncome}
Eligible Categories: ${scholarship1.eligibleCategories.join(", ")}
Eligible States: ${scholarship1.eligibleStates.join(", ")}
Gender: ${scholarship1.gender}

Scholarship 2

Name: ${scholarship2.scholarshipName}
Provider: ${scholarship2.provider}
Amount: ₹${scholarship2.amount}
Minimum Qualification: ${scholarship2.minimumQualification}
Minimum Percentage: ${scholarship2.minimumPercentage}
Maximum Family Income: ₹${scholarship2.maximumFamilyIncome}
Eligible Categories: ${scholarship2.eligibleCategories.join(", ")}
Eligible States: ${scholarship2.eligibleStates.join(", ")}
Gender: ${scholarship2.gender}

Return ONLY valid JSON.

{
  "scholarship1": "",
  "scholarship2": "",
  "winner": "",
  "advantages": [
    "",
    ""
  ],
  "disadvantages": [
    "",
    ""
  ],
  "recommendation": ""
}

Rules

1. scholarship1 should contain a short summary of Scholarship 1.
2. scholarship2 should contain a short summary of Scholarship 2.
3. winner must be either Scholarship 1 name or Scholarship 2 name.
4. advantages should be an array.
5. disadvantages should be an array.
6. recommendation should explain why the winner is better.
7. Return ONLY JSON.
`;

        const completion = await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [

                {

                    role: "user",

                    content: prompt

                }

            ],

            temperature: 0.3,

            response_format: {

                type: "json_object"

            },

            max_tokens: 700

        });

        return JSON.parse(

            completion.choices[0].message.content

        );

    }

    catch (error) {

        console.error(error);

        return {

            scholarship1: scholarship1.scholarshipName,

            scholarship2: scholarship2.scholarshipName,

            winner: "Manual Review",

            advantages: [],

            disadvantages: [],

            recommendation: "Unable to compare scholarships."

        };

    }

};

module.exports = {

    generateScholarshipExplanation,

    generateChatResponse,

    generateEligibilityVerification,
    generateScholarshipComparison

};