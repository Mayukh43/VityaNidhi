import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5200/api/applications",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setApplications(response.data);
        } catch (error) {
            console.log(error);
            alert("Unable to load applications.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh", background: "linear-gradient(135deg,#F8FAFC,#EAF3FF,#DCEEFF)" }}>
                <h2 style={{ fontFamily: "Arial", color: "#2563EB" }}>Loading Master Register...</h2>
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
                    max-width: 1200px;
                    background: rgba(255, 255, 255, 0.45);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border-radius: 25px;
                    padding: 45px;
                    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02);
                    border: 1px solid rgba(219, 234, 254, 0.7);
                }

                .headingSection {
                    margin-bottom: 40px;
                }

                .headingSection h1 {
                    color: #1E293B;
                    font-size: 32px;
                    font-weight: 800;
                    margin-bottom: 10px;
                }

                .headingSection hr {
                    border: none;
                    height: 3px;
                    background: linear-gradient(90deg, #2563EB, transparent);
                    border-radius: 2px;
                    width: 250px;
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

                .cardsGrid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
                    gap: 25px;
                }

                .appCard {
                    background: rgba(255, 255, 255, 0.7);
                    border: 1px solid rgba(226, 232, 240, 0.8);
                    border-radius: 18px;
                    padding: 25px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -1px rgba(0, 0, 0, 0.01);
                    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .appCard:hover {
                    transform: translateY(-4px);
                    border-color: rgba(37, 99, 235, 0.3);
                    box-shadow: 0 12px 20px -5px rgba(37, 99, 235, 0.08), 0 4px 6px -2px rgba(37, 99, 235, 0.04);
                }

                .cardHeader {
                    margin-bottom: 18px;
                }

                .cardHeader h2 {
                    color: #1E293B;
                    font-size: 19px;
                    font-weight: 700;
                    line-height: 1.4;
                    margin-bottom: 4px;
                }

                .providerText {
                    font-size: 13px;
                    color: #64748B;
                    font-weight: 500;
                }

                .cardMetricsList {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-bottom: 24px;
                }

                .metricItem {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    border-bottom: 1px solid rgba(241, 245, 249, 0.8);
                    padding-bottom: 8px;
                }

                .metricItem:last-child {
                    border-bottom: none;
                    padding-bottom: 0;
                }

                .metricItem label {
                    color: #64748B;
                    font-weight: 500;
                }

                .metricItem span {
                    color: #0F172A;
                    font-weight: 600;
                    max-width: 65%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .statusBadge {
                    padding: 4px 12px;
                    border-radius: 12px;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.3px;
                }

                .status-pending { background: #FEF3C7; color: #D97706; }
                .status-approved { background: #D1FAE5; color: #059669; }
                .status-rejected { background: #FEE2E2; color: #DC2626; }

                .actionLink {
                    text-decoration: none;
                    width: 100%;
                    margin-top: auto;
                }

                .actionBtn {
                    width: 100%;
                    padding: 11px 0;
                    background: #2563EB;
                    color: #FFFFFF;
                    border: none;
                    border-radius: 10px;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: background 0.2s, transform 0.1s;
                    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
                }

                .actionBtn:hover {
                    background: #1D4ED8;
                }

                .actionBtn:active {
                    transform: scale(0.98);
                }
            `}</style>

            <div className="pageWrapper">
                <div className="mainContainer">
                    
                    <div className="headingSection">
                        <h1>Student Applications</h1>
                        <hr />
                    </div>

                    {applications.length === 0 ? (
                        <div className="noDataCard">
                            <h3>No Active Submissions Registered</h3>
                        </div>
                    ) : (
                        <div className="cardsGrid">
                            {applications.map((application) => (
                                <div className="appCard" key={application._id}>
                                    
                                    <div className="cardHeader">
                                        <h2>{application.scholarship?.scholarshipName}</h2>
                                        <span className="providerText">{application.scholarship?.provider}</span>
                                    </div>

                                    <div className="cardMetricsList">
                                        <div className="metricItem">
                                            <label>Applicant</label>
                                            <span>{application.student?.name}</span>
                                        </div>
                                        <div className="metricItem">
                                            <label>Email ID</label>
                                            <span title={application.student?.email}>{application.student?.email}</span>
                                        </div>
                                        <div className="metricItem">
                                            <label>Disbursement</label>
                                            <span style={{ color: "#059669" }}>
                                                ₹{Number(application.scholarship?.amount).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                        <div className="metricItem">
                                            <label>Timestamp</label>
                                            <span>{new Date(application.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="metricItem">
                                            <label>System Audit</label>
                                            <span className={`statusBadge status-${application.status?.toLowerCase()}`}>
                                                {application.status}
                                            </span>
                                        </div>
                                    </div>

                                    <Link className="actionLink" to={`/admin/applications/${application._id}`}>
                                        <button className="actionBtn">
                                            Open Application File
                                        </button>
                                    </Link>

                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default AdminApplications;