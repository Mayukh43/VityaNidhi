import { Link } from "react-router-dom";

const ScholarshipCard = ({ scholarship }) => {

    return (

        <div>

            <h2>{scholarship.scholarshipName}</h2>

            <hr />

            <p>

                <strong>Provider:</strong>{" "}

                {scholarship.provider}

            </p>

            <p>

                <strong>Scholarship Type:</strong>{" "}

                {scholarship.scholarshipType}

            </p>

            <p>

                <strong>Category:</strong>{" "}

                {
                    scholarship.eligibleCategories &&
                    scholarship.eligibleCategories.length > 0
                        ? scholarship.eligibleCategories.join(", ")
                        : "All Categories"
                }

            </p>

            <p>

                <strong>Eligible States:</strong>{" "}

                {
                    scholarship.eligibleStates &&
                    scholarship.eligibleStates.length > 0
                        ? scholarship.eligibleStates.join(", ")
                        : "All India"
                }

            </p>

            <p>

                <strong>Minimum Qualification:</strong>{" "}

                {scholarship.minimumQualification}

            </p>

            <p>

                <strong>Maximum Family Income:</strong>{" "}

                ₹{scholarship.maximumFamilyIncome}

            </p>

            <p>

                <strong>Scholarship Amount:</strong>{" "}

                ₹{scholarship.amount}

            </p>

            <p>

                <strong>Application Deadline:</strong>{" "}

                {
                    scholarship.applicationDeadline
                        ? new Date(
                            scholarship.applicationDeadline
                        ).toLocaleDateString()
                        : "N/A"
                }

            </p>

            {

                scholarship.officialWebsite && (

                    <p>

                        <strong>Official Website:</strong>{" "}

                        <a
                            href={scholarship.officialWebsite}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                color: "#2563eb",
                                fontWeight: "600",
                                textDecoration: "none"
                            }}
                        >

                            Visit Official Website

                        </a>

                    </p>

                )

            }

            <br />

            <Link to={`/scholarships/${scholarship._id}`}>

                <button>

                    View Details

                </button>

            </Link>

            <hr />

        </div>

    );

};

export default ScholarshipCard;