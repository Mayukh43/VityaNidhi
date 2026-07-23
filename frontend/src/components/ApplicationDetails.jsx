import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ApplicationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [application, setApplication] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState(false);
    const [aiReport, setAiReport] = useState(null);

    const [verificationStatus, setVerificationStatus] = useState("");
    const [verificationRemarks, setVerificationRemarks] = useState("");

    useEffect(() => {
        fetchApplication();
    }, []);

    const fetchApplication = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5200/api/applications/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setApplication(response.data.application);
            setProfile(response.data.profile);
            setVerificationStatus(
                response.data.application.verificationStatus || "Pending"
            );
            setVerificationRemarks(
                response.data.application.verificationRemarks || ""
            );
        } catch (error) {
            console.log(error);
            alert("Unable to fetch application details.");
        } finally {
            setLoading(false);
        }
    };

    const verifyWithAI = async () => {
        try {
            setVerifying(true);
            const response = await axios.post(
                `http://localhost:5200/api/ai/verify/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setAiReport(response.data.aiReport);
            alert("AI Verification Completed.");
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "AI Verification Failed."
            );
        } finally {
            setVerifying(false);
        }
    };

    const verifyDocuments = async (status) => {
        try {
            await axios.put(
                `http://localhost:5200/api/applications/${id}/verify`,
                {
                    verificationStatus: status,
                    verificationRemarks
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert("Verification Updated Successfully.");
            fetchApplication();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Verification Failed."
            );
        }
    };

    const updateStatus = async (status) => {
        try {
            await axios.put(
                `http://localhost:5200/api/applications/${id}/status`,
                {
                    status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert(`Application ${status}`);
            fetchApplication();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Error updating status."
            );
        }
    };

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh", background: "linear-gradient(135deg,#F8FAFC,#EAF3FF,#DCEEFF)" }}>
                <h2 style={{ fontFamily: "Arial", color: "#2563EB" }}>Loading Application Details...</h2>
            </div>
        );
    }

    if (!application) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh", background: "linear-gradient(135deg,#F8FAFC,#EAF3FF,#DCEEFF)" }}>
                <h2 style={{ fontFamily: "Arial", color: "#EF4444" }}>Application not found.</h2>
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

                .appPage {
                    min-height: 90vh;
                    background: linear-gradient(135deg, #F8FAFC, #EAF3FF, #DCEEFF);
                    padding: 50px 40px;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                }

                .appContainer {
                    width: 100%;
                    max-width: 1100px;
                    background: rgba(255, 255, 255, 0.45);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border-radius: 25px;
                    padding: 45px;
                    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02);
                    border: 1px solid rgba(219, 234, 254, 0.7);
                }

                .appHeader {
                    margin-bottom: 35px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                }

                .appHeaderTitle h1 {
                    color: #1E293B;
                    font-size: 32px;
                    font-weight: 800;
                    margin-bottom: 8px;
                }

                .appHeaderTitle hr {
                    border: none;
                    height: 3px;
                    background: linear-gradient(90deg, #2563EB, transparent);
                    border-radius: 2px;
                    width: 200px;
                }

                .statusBadgeContainer {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .statusBadge {
                    padding: 8px 18px;
                    border-radius: 20px;
                    font-weight: bold;
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .status-pending { background: #FEF3C7; color: #D97706; }
                .status-approved { background: #D1FAE5; color: #059669; }
                .status-rejected { background: #FEE2E2; color: #DC2626; }

                .sectionCard {
                    background: rgba(255, 255, 255, 0.7);
                    border: 1px solid rgba(226, 232, 240, 0.8);
                    border-radius: 16px;
                    padding: 25px;
                    margin-bottom: 30px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -1px rgba(0, 0, 0, 0.01);
                }

                .sectionCard h2 {
                    color: #1E293B;
                    font-size: 20px;
                    font-weight: 700;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border-bottom: 1px solid #E2E8F0;
                    padding-bottom: 10px;
                }

                .infoGrid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                    gap: 20px;
                }

                .infoGroup {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .infoGroup label {
                    font-size: 13px;
                    color: #64748B;
                    font-weight: 600;
                }

                .infoGroup span {
                    font-size: 15px;
                    color: #0F172A;
                    font-weight: 500;
                }

                .docGrid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 15px;
                }

                .docCard {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #F8FAFC;
                    padding: 14px 18px;
                    border-radius: 12px;
                    border: 1px solid #E2E8F0;
                }

                .docCard strong {
                    font-size: 14px;
                    color: #334155;
                    text-transform: capitalize;
                }

                .docLink {
                    color: #2563EB;
                    font-size: 13px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: .2s;
                    padding: 6px 12px;
                    background: #EFF6FF;
                    border-radius: 8px;
                }

                .docLink:hover {
                    background: #2563EB;
                    color: #FFFFFF;
                }

                .textareaControl {
                    width: 100%;
                    padding: 14px;
                    border: 1px solid rgba(191, 219, 254, 0.8);
                    outline: none;
                    border-radius: 12px;
                    background: #F8FAFC;
                    color: #0F172A;
                    font-size: 15px;
                    transition: .3s;
                    resize: vertical;
                    min-height: 100px;
                    margin-top: 8px;
                    margin-bottom: 20px;
                }

                .textareaControl:focus {
                    background: #FFFFFF;
                    border-color: #2563EB;
                    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
                }

                .btnGroup {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .baseBtn {
                    padding: 12px 24px;
                    border: none;
                    border-radius: 10px;
                    font-size: 14px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: .2s;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }

                .btn-primary { background: #2563EB; color: white; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15); }
                .btn-primary:hover:not(:disabled) { background: #1D4ED8; transform: translateY(-1px); }
                
                .btn-success { background: #10B981; color: white; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15); }
                .btn-success:hover { background: #059669; transform: translateY(-1px); }

                .btn-danger { background: #EF4444; color: white; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15); }
                .btn-danger:hover { background: #DC2626; transform: translateY(-1px); }

                .btn-secondary { background: #64748B; color: white; box-shadow: 0 4px 12px rgba(100, 116, 139, 0.15); }
                .btn-secondary:hover { background: #475569; transform: translateY(-1px); }

                .btn-primary:disabled {
                    background: #94A3B8;
                    cursor: not-allowed;
                    box-shadow: none;
                }

                .aiReportCard {
                    background: #F8FAFC;
                    border: 1px solid #E2E8F0;
                    border-left: 5px solid #2563EB;
                    border-radius: 12px;
                    padding: 20px;
                    margin-top: 20px;
                }

                .aiMetricGroup {
                    display: flex;
                    gap: 30px;
                    margin-bottom: 20px;
                    flex-wrap: wrap;
                }

                .aiMetric {
                    background: white;
                    padding: 12px 20px;
                    border-radius: 10px;
                    border: 1px solid #E2E8F0;
                }

                .checkGrid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 15px;
                    margin-top: 15px;
                }

                .checkCard {
                    background: white;
                    padding: 15px;
                    border-radius: 10px;
                    border: 1px solid #E2E8F0;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .badge-check {
                    display: inline-block;
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: bold;
                    width: max-content;
                }
                .badge-check-passed { background: #D1FAE5; color: #059669; }
                .badge-check-failed { background: #FEE2E2; color: #DC2626; }
                
                .footerActions {
                    margin-top: 40px;
                    padding-top: 25px;
                    border-top: 1px solid rgba(226, 232, 240, 0.8);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                }
            `}</style>

            <div className="appPage">
                <div className="appContainer">
                    
                    {/* Header Summary section */}
                    <div className="appHeader">
                        <div className="appHeaderTitle">
                            <h1>Application Profile</h1>
                            <hr />
                        </div>
                        <div className="statusBadgeContainer">
                            <span style={{ fontSize: "14px", color: "#64748B", fontWeight: "600" }}>Global Status:</span>
                            <span className={`statusBadge status-${application.status?.toLowerCase()}`}>
                                {application.status}
                            </span>
                        </div>
                    </div>

                    {/* Student Basic Identity Card */}
                    <div className="sectionCard">
                        <h2>Student Core Information</h2>
                        <div className="infoGrid">
                            <div className="infoGroup">
                                <label>Full Name</label>
                                <span>{application.student?.name}</span>
                            </div>
                            <div className="infoGroup">
                                <label>Email Address</label>
                                <span>{application.student?.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Profile Metrics */}
                    <div className="sectionCard">
                        <h2>Academic & Personal Profile</h2>
                        {profile ? (
                            <div className="infoGrid">
                                <div className="infoGroup">
                                    <label>Date of Birth</label>
                                    <span>{profile.dateOfBirth?.substring(0, 10)}</span>
                                </div>
                                <div className="infoGroup">
                                    <label>Gender</label>
                                    <span>{profile.gender}</span>
                                </div>
                                <div className="infoGroup">
                                    <label>Phone Number</label>
                                    <span>{profile.phone}</span>
                                </div>
                                <div className="infoGroup">
                                    <label>State / Region</label>
                                    <span>{profile.state}</span>
                                </div>
                                <div className="infoGroup">
                                    <label>District</label>
                                    <span>{profile.district}</span>
                                </div>
                                <div className="infoGroup">
                                    <label>Current Standard</label>
                                    <span>{profile.currentStandard}</span>
                                </div>
                                <div className="infoGroup">
                                    <label>Highest Qualification</label>
                                    <span>{profile.highestQualification}</span>
                                </div>
                                <div className="infoGroup">
                                    <label>Institution Name</label>
                                    <span>{profile.institutionName}</span>
                                </div>
                                <div className="infoGroup">
                                    <label>Course Track</label>
                                    <span>{profile.course}</span>
                                </div>
                                <div className="infoGroup">
                                    <label>Current Semester</label>
                                    <span>{profile.semester}</span>
                                </div>
                                <div className="infoGroup">
                                    <label>Marks Percentage</label>
                                    <span>{profile.percentage ? `${profile.percentage}%` : "N/A"}</span>
                                </div>
                                <div className="infoGroup">
                                    <label>Cumulative CGPA</label>
                                    <span>{profile.cgpa || "N/A"}</span>
                                </div>
                                <div className="infoGroup">
                                    <label>Annual Family Income</label>
                                    <span>₹{Number(profile.annualIncome).toLocaleString('en-IN')}</span>
                                </div>
                                <div className="infoGroup">
                                    <label>Social Category</label>
                                    <span>{profile.category}</span>
                                </div>
                                <div className="infoGroup">
                                    <label>Minority Standing Status</label>
                                    <span>{profile.minority ? "Yes" : "No"}</span>
                                </div>
                                <div className="infoGroup">
                                    <label>Disability Status</label>
                                    <span>{profile.disability ? "Yes" : "No"}</span>
                                </div>
                                <div className="infoGroup">
                                    <label>Single Girl Child Status</label>
                                    <span>{profile.singleGirlChild ? "Yes" : "No"}</span>
                                </div>
                                <div className="infoGroup" style={{ gridColumn: "span 2" }}>
                                    <label>Full Residential Address</label>
                                    <span>{profile.address}</span>
                                </div>
                            </div>
                        ) : (
                            <h3 style={{ color: "#64748B", fontSize: "15px" }}>No Student Profile Meta Found.</h3>
                        )}
                    </div>

                    {/* Document Repository View */}
                    {profile && profile.documents && (
                        <div className="sectionCard">
                            <h2>Uploaded Verification Attachments</h2>
                            <div className="docGrid">
                                {Object.entries(profile.documents).map(([key, value]) => (
                                    value && (
                                        <div className="docCard" key={key}>
                                            <strong>{key.replace(/([A-Z])/g, ' $1')}</strong>
                                            <a
                                                className="docLink"
                                                href={`http://localhost:5200${value.replace(/\\/g, "/")}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                View Source
                                            </a>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Officer Document Verification Panel */}
                    <div className="sectionCard">
                        <h2>Manual Document Verification Handling</h2>
                        
                        <div className="infoGrid" style={{ marginBottom: "20px" }}>
                            <div className="infoGroup">
                                <label>Verification Status</label>
                                <span style={{ fontWeight: "700", color: "#1E293B" }}>{application.verificationStatus}</span>
                            </div>
                            {application.verifiedBy && (
                                <div className="infoGroup">
                                    <label>Audited By</label>
                                    <span>{application.verifiedBy.name}</span>
                                </div>
                            )}
                            {application.verifiedAt && (
                                <div className="infoGroup">
                                    <label>Audited Timestamp</label>
                                    <span>{new Date(application.verifiedAt).toLocaleString()}</span>
                                </div>
                            )}
                        </div>

                        <div className="infoGroup">
                            <label style={{ color: "#1E293B" }}>Verification Notes / Remarks</label>
                            <textarea
                                className="textareaControl"
                                placeholder="Enter operational audit findings, notes or grounds for dynamic rejection/approval logic..."
                                value={verificationRemarks}
                                onChange={(e) => setVerificationRemarks(e.target.value)}
                            />
                        </div>

                        <div className="btnGroup">
                            <button className="baseBtn btn-success" onClick={() => verifyDocuments("Verified")}>
                                Approve Documents
                            </button>
                            <button className="baseBtn btn-danger" onClick={() => verifyDocuments("Rejected")}>
                                Reject Documents
                            </button>
                        </div>
                    </div>

                    {/* AI Assessment Section */}
                    <div className="sectionCard">
                        <h2>AI Assisted Eligibility Auditing</h2>
                        <p style={{ fontSize: "14px", color: "#64748B", marginBottom: "15px" }}>
                            Run an automated data match analysis assessing cross-profile parameters configuration against target limits.
                        </p>
                        
                        <button className="baseBtn btn-primary" onClick={verifyWithAI} disabled={verifying}>
                            {verifying ? "Executing Verification Model..." : "Verify with AI Engine"}
                        </button>

                        {aiReport && (
                            <div className="aiReportCard">
                                <h3 style={{ fontSize: "16px", color: "#1E293B", marginBottom: "15px" }}>AI System Generation Summary</h3>
                                
                                <div className="aiMetricGroup">
                                    <div className="aiMetric">
                                        <div style={{ fontSize: "12px", color: "#64748B" }}>Confidence Score</div>
                                        <div style={{ fontSize: "22px", fontWeight: "800", color: "#2563EB" }}>{aiReport.eligibilityScore}%</div>
                                    </div>
                                    <div className="aiMetric">
                                        <div style={{ fontSize: "12px", color: "#64748B" }}>Engine Recommendation</div>
                                        <div style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A", marginTop: "5px" }}>{aiReport.recommendation}</div>
                                    </div>
                                </div>

                                <div style={{ fontWeight: "700", fontSize: "14px", color: "#334155" }}>Target Field Assertions</div>
                                <div className="checkGrid">
                                    {aiReport.checks?.map((check, index) => (
                                        <div className="checkCard" key={index}>
                                            <strong style={{ fontSize: "14px", color: "#0F172A" }}>{check.field}</strong>
                                            <div>
                                                <span className={`badge-check badge-check-${check.status?.toLowerCase() === 'passed' ? 'passed' : 'failed'}`}>
                                                    {check.status}
                                                </span>
                                            </div>
                                            <p style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>{check.reason}</p>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ marginTop: "20px", borderTop: "1px solid #E2E8F0", paddingTop: "15px" }}>
                                    <h4 style={{ fontSize: "14px", color: "#334155", marginBottom: "6px" }}>Comprehensive Core Summary</h4>
                                    <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.5" }}>{aiReport.summary}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Master Actions Footer Bar */}
                    <div className="footerActions">
                        <div className="btnGroup">
                            <button className="baseBtn btn-success" style={{ padding: "14px 32px" }} onClick={() => updateStatus("Approved")}>
                                Approve Entire Application
                            </button>
                            <button className="baseBtn btn-danger" style={{ padding: "14px 32px" }} onClick={() => updateStatus("Rejected")}>
                                Reject Entire Application
                            </button>
                        </div>

                        <button className="baseBtn btn-secondary" style={{ padding: "14px 28px" }} onClick={() => navigate("/admin/applications")}>
                            Back to Register
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ApplicationDetails;