import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Scholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchScholarships();
    }, []);

    const fetchScholarships = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5200/api/scholarships"
            );
            setScholarships(response.data.scholarships);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredScholarships = scholarships.filter((item) =>
        item.scholarshipName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.provider?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh", background: "linear-gradient(135deg,#F8FAFC,#EAF3FF,#DCEEFF)" }}>
                <h2 style={{ fontFamily: "Arial", color: "#2563EB" }}>Loading Available Opportunities...</h2>
            </div>
        );
    }

    return (
        <>
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: Arial, Helvetica, sans-serif;
                }

                .pageWrapper {
                    min-height: 90vh;
                    background: linear-gradient(135deg, #F8FAFC, #EAF3FF, #DCEEFF);
                    padding: 50px 40px;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                }

                .mainContainer {
                    width: 100%;
                    max-width: 1000px;
                    background: rgba(255, 255, 255, 0.45);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border-radius: 25px;
                    padding: 45px;
                    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02);
                    border: 1px solid rgba(219, 234, 254, 0.7);
                }

                .topSection {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                    margin-bottom: 35px;
                }

                .titleHeader h1 {
                    color: #1E293B;
                    font-size: 32px;
                    font-weight: 800;
                    margin-bottom: 8px;
                }

                .titleHeader hr {
                    border: none;
                    height: 3px;
                    background: linear-gradient(90deg, #2563EB, transparent);
                    border-radius: 2px;
                    width: 180px;
                }

                .searchBox {
                    position: relative;
                    min-width: 320px;
                }

                .searchInput {
                    width: 100%;
                    padding: 12px 18px;
                    border-radius: 12px;
                    border: 1px solid rgba(191, 219, 254, 0.8);
                    background: rgba(255, 255, 255, 0.8);
                    outline: none;
                    font-size: 14px;
                    color: #0F172A;
                    transition: all 0.25s ease;
                }

                .searchInput:focus {
                    background: #FFFFFF;
                    border-color: #2563EB;
                    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
                }

                .noDataCard {
                    background: rgba(255, 255, 255, 0.6);
                    border: 1px dashed #CBD5E1;
                    padding: 60px 20px;
                    text-align: center;
                    border-radius: 16px;
                }

                .noDataCard h3 {
                    color: #64748B;
                    font-size: 18px;
                    font-weight: 600;
                }

                .scholarshipsStack {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                    width: 100%;
                }

                .scholarshipItemContainer {
                    padding-bottom: 20px;
                    border-bottom: 1px solid #CBD5E1;
                }

                .scholarshipTitleRow {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 20px;
                    margin-bottom: 12px;
                }

                .scholarshipTitleRow h2 {
                    color: #0F172A;
                    font-size: 22px;
                    font-weight: 800;
                }

                .scholarshipTextDetails p {
                    font-size: 15px;
                    color: #1E293B;
                    line-height: 1.6;
                    margin-bottom: 4px;
                }

                .scholarshipTextDetails strong {
                    color: #0F172A;
                }

                /* Right-aligned View Details Link & Button styling */
                .styledViewDetailsBtn {
                    padding: 10px 22px;
                    background: #2563EB;
                    color: #FFFFFF;
                    border: none;
                    border-radius: 10px;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.18);
                    white-space: nowrap;
                }

                .styledViewDetailsBtn:hover {
                    background: #1D4ED8;
                    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.28);
                    transform: translateY(-1px);
                }

                .styledViewDetailsBtn:active {
                    transform: translateY(0);
                }

                @media (max-width: 640px) {
                    .scholarshipTitleRow {
                        flex-direction: column;
                    }
                    .styledViewDetailsBtn {
                        width: 100%;
                    }
                }
            `}</style>

            <div className="pageWrapper">
                <div className="mainContainer">
                   
                    <div className="topSection">
                        <div className="titleHeader">
                            <h1>Explore Scholarships</h1>
                            <hr />
                        </div>

                        <div className="searchBox">
                            <input
                                type="text"
                                className="searchInput"
                                placeholder="Search scheme, provider, or category..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {filteredScholarships.length === 0 ? (
                        <div className="noDataCard">
                            <h3>No Matching Scholarships Found</h3>
                        </div>
                    ) : (
                        <div className="scholarshipsStack">
                            {filteredScholarships.map((scholarship) => (
                                <div key={scholarship._id} className="scholarshipItemContainer">
                                   
                                    {/* Title and Functional View Details Link */}
                                    <div className="scholarshipTitleRow">
                                        <h2>{scholarship.scholarshipName}</h2>
                                       
                                        <Link
                                            to={`/scholarships/${scholarship._id}`}
                                            className="styledViewDetailsBtn"
                                        >
                                            View Details
                                        </Link>
                                    </div>

                                    {/* Text details */}
                                    <div className="scholarshipTextDetails">
                                        <p><strong>Provider:</strong> {scholarship.provider}</p>
                                        <p><strong>Scholarship Type:</strong> {scholarship.scholarshipType || "Government"}</p>
                                        <p>
                                         <strong>Category:</strong>{" "}
                                         {scholarship.eligibleCategories?.join(", ") || "All Categories"}
                                        </p>
                                        <p><strong>Eligible States:</strong> {scholarship.eligibleStates || "All India"}</p>
                                        <p><strong>Minimum Qualification:</strong> {scholarship.minimumQualification || "12th"}</p>
                                        <p>
                                            <strong>Maximum Family Income:</strong>{" "}
                                            ₹{scholarship.maximumFamilyIncome}
                                        </p>
                                        <p><strong>Scholarship Amount:</strong> ₹{scholarship.amount}</p>
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
                                        <p>

        <strong>Official Website:</strong>{" "}

        {
            scholarship.officialWebsite ? (

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

            ) : (

                "Not Available"

            )
        }

    </p>

                                    </div>

                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default Scholarships;