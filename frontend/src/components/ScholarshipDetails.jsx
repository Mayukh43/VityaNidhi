import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ScholarshipDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [scholarship, setScholarship] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        fetchScholarship();
    }, []);

    const fetchScholarship = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5200/api/scholarships/${id}`
            );
            setScholarship(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const applyScholarship = async () => {
        try {
            setApplying(true);
            const response = await axios.post(
                "http://localhost:5200/api/applications",
                {
                    scholarship: id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert(response.data.message);
            navigate("/applications");
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Server Error");
            }
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh", background: "linear-gradient(135deg, #F8FAFC, #EAF3FF, #DCEEFF)" }}>
                <h2 style={{ fontFamily: "Arial", color: "#2563EB" }}>Loading Scholarship Details...</h2>
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

                .detailsWrapper {
                    min-height: 90vh;
                    background: linear-gradient(135deg, #F8FAFC, #EAF3FF, #DCEEFF);
                    padding: 50px 20px;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                }

                .detailsContainer {
                    width: 100%;
                    max-width: 850px;
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border-radius: 24px;
                    padding: 40px;
                    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.08);
                    border: 1px solid rgba(219, 234, 254, 0.8);
                }

                .backButton {
                    background: transparent;
                    border: none;
                    color: #2563EB;
                    font-weight: 700;
                    font-size: 14px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    margin-bottom: 20px;
                    transition: transform 0.2s ease;
                }

                .backButton:hover {
                    transform: translateX(-4px);
                }

                .headerGroup h1 {
                    color: #0F172A;
                    font-size: 28px;
                    font-weight: 800;
                    margin-bottom: 12px;
                    line-height: 1.3;
                }

                .headerGroup hr {
                    border: none;
                    height: 3px;
                    background: linear-gradient(90deg, #2563EB, transparent);
                    border-radius: 2px;
                    margin-bottom: 24px;
                }

                .descriptionBox {
                    background: rgba(255, 255, 255, 0.6);
                    border-left: 4px solid #2563EB;
                    padding: 16px 20px;
                    border-radius: 0 12px 12px 0;
                    margin-bottom: 30px;
                }

                .descriptionBox p {
                    font-size: 15px;
                    color: #334155;
                    line-height: 1.6;
                }

                .infoGrid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 20px;
                    margin-bottom: 35px;
                }

                .infoCard {
                    background: #FFFFFF;
                    padding: 16px 20px;
                    border-radius: 12px;
                    border: 1px solid #E2E8F0;
                }

                .infoCard label {
                    display: block;
                    font-size: 12px;
                    font-weight: 700;
                    color: #64748B;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 6px;
                }

                .infoCard p {
                    font-size: 16px;
                    font-weight: 700;
                    color: #0F172A;
                }

                .highlightAmount {
                    color: #059669 !important;
                }

                .actionRow {
                    display: flex;
                    justify-content: flex-end;
                    padding-top: 10px;
                }

                .applyBtn {
                    padding: 14px 36px;
                    background: #2563EB;
                    color: #FFFFFF;
                    border: none;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
                }

                .applyBtn:hover:not(:disabled) {
                    background: #1D4ED8;
                    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35);
                    transform: translateY(-2px);
                }

                .applyBtn:disabled {
                    background: #94A3B8;
                    cursor: not-allowed;
                    box-shadow: none;
                }

                @media (max-width: 640px) {
                    .detailsContainer {
                        padding: 24px;
                    }

                    .applyBtn {
                        width: 100%;
                    }
                }
            `}</style>

            <div className="detailsWrapper">
                <div className="detailsContainer">
                    <button className="backButton" onClick={() => navigate(-1)}>
                        &larr; Back to Scholarships
                    </button>

                    <div className="headerGroup">
                        <h1>{scholarship.scholarshipName}</h1>
                        <hr />
                    </div>

                    {scholarship.description && (
                        <div className="descriptionBox">
                            <p><strong>Description:</strong> {scholarship.description}</p>
                        </div>
                    )}

                    <div className="infoGrid">
                        <div className="infoCard">
                            <label>Provider</label>
                            <p>{scholarship.provider}</p>
                        </div>

                        <div className="infoCard">
                            <label>Amount</label>
                            <p className="highlightAmount">₹{scholarship.amount}</p>
                        </div>

                        <div className="infoCard">
                            <label>Category</label>
                            <p>{scholarship.eligibleCategories?.join(", ") || scholarship.category || "N/A"}</p>
                        </div>

                        <div className="infoCard">
                            <label>State</label>
                            <p>{scholarship.eligibleStates?.join(", ") || scholarship.eligibleStates || "N/A"}</p>
                        </div>

                        <div className="infoCard">
                            <label>Qualification</label>
                            <p>{scholarship.minimumQualification || "N/A"}</p>
                        </div>

                        <div className="infoCard">
                            <label>Income Limit</label>
                            <p>₹{scholarship.maximumFamilyIncome || scholarship.maxFamilyIncome || "N/A"}</p>
                        </div>
                    </div>

                    <div className="infoCard">
    <label>Official Website</label>

    <p>
        {
            scholarship.officialWebsite ? (

                <a
                    href={scholarship.officialWebsite}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        color: "#2563EB",
                        textDecoration: "none",
                        fontWeight: "700"
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

                    <div className="actionRow">
                        <button
                            className="applyBtn"
                            onClick={applyScholarship}
                            disabled={applying}
                        >
                            {applying ? "Applying..." : "Apply Now"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScholarshipDetails;