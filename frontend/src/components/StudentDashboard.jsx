import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
    const [studentName, setStudentName] = useState("");

    useEffect(() => {
        const name = localStorage.getItem("name");
        if (name) {
            setStudentName(name);
        }
    }, []);

    const services = [
        {
            title: "Complete Profile",
            description: "Update your personal details, academic metrics, and verification documents.",
            link: "/profile",
            tag: "Essential",
            tagColor: "#2563EB"
        },
        {
            title: "Browse Scholarships",
            description: "Explore all available active funding opportunities and eligibility criteria.",
            link: "/scholarships",
            tag: "Explore",
            tagColor: "#059669"
        },
        {
            title: "AI Recommendation",
            description: "Get personalized scholarship matches based on your profile parameters.",
            link: "/recommendations",
            tag: "AI Powered",
            tagColor: "#7C3AED"
        },
        {
            title: "AI Scholarship Chatbot",
            description: "Chat with our virtual assistant for instant support and application guidance.",
            link: "/chat",
            tag: "24/7 Support",
            tagColor: "#2563EB"
        },
        {
            title: "Compare Scholarships",
            description: "Side-by-side comparison of benefits, eligibility, and deadlines.",
            link: "/compare",
            tag: "Analysis",
            tagColor: "#D97706"
        },
        {
            title: "My Applications",
            description: "Track submission statuses, officer notes, and document verification stages.",
            link: "/applications",
            tag: "Status Tracker",
            tagColor: "#059669"
        }
    ];

    return (
        <>
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: Arial, Helvetica, sans-serif;
                }

                .dashboardPage {
                    min-height: 90vh;
                    background: linear-gradient(135deg, #F8FAFC, #EAF3FF, #DCEEFF);
                    padding: 50px 40px;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                }

                .dashboardContainer {
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

                .welcomeHeader {
                    margin-bottom: 35px;
                }

                .welcomeHeader h1 {
                    color: #1E293B;
                    font-size: 32px;
                    font-weight: 800;
                    margin-bottom: 6px;
                }

                .welcomeHeader h3 {
                    color: #2563EB;
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 12px;
                }

                .welcomeHeader hr {
                    border: none;
                    height: 3px;
                    background: linear-gradient(90deg, #2563EB, transparent);
                    border-radius: 2px;
                    width: 220px;
                }

                .sectionTitle {
                    color: #1E293B;
                    font-size: 20px;
                    font-weight: 700;
                    margin-bottom: 25px;
                }

                .servicesGrid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 20px;
                }

                .serviceCard {
                    background: rgba(255, 255, 255, 0.7);
                    border: 1px solid rgba(226, 232, 240, 0.8);
                    border-radius: 16px;
                    padding: 25px;
                    text-decoration: none;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    transition: all 0.25s ease;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01);
                }

                .serviceCard:hover {
                    transform: translateY(-4px);
                    background: rgba(255, 255, 255, 0.95);
                    border-color: rgba(37, 99, 235, 0.3);
                    box-shadow: 0 12px 20px -5px rgba(37, 99, 235, 0.08);
                }

                .cardTop {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 12px;
                }

                .cardTitle {
                    color: #1E293B;
                    font-size: 18px;
                    font-weight: 700;
                }

                .cardTag {
                    font-size: 11px;
                    font-weight: 700;
                    padding: 4px 10px;
                    border-radius: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.3px;
                }

                .cardDesc {
                    color: #64748B;
                    font-size: 14px;
                    line-height: 1.5;
                    margin-bottom: 20px;
                }

                .cardAction {
                    color: #2563EB;
                    font-size: 14px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .serviceCard:hover .cardAction {
                    color: #1D4ED8;
                }
            `}</style>

            <div className="dashboardPage">
                <div className="dashboardContainer">
                    
                    <div className="welcomeHeader">
                        <h1>Student Dashboard</h1>
                        <h3>Welcome, {studentName || "Student"} 👋</h3>
                        <hr />
                    </div>

                    <h2 className="sectionTitle">Student Services</h2>

                    <div className="servicesGrid">
                        {services.map((service, index) => (
                            <Link to={service.link} key={index} className="serviceCard">
                                <div>
                                    <div className="cardTop">
                                        <h3 className="cardTitle">{service.title}</h3>
                                        <span 
                                            className="cardTag"
                                            style={{ 
                                                backgroundColor: `${service.tagColor}15`, 
                                                color: service.tagColor 
                                            }}
                                        >
                                            {service.tag}
                                        </span>
                                    </div>
                                    <p className="cardDesc">{service.description}</p>
                                </div>
                                <div className="cardAction">
                                    Access Service &rarr;
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
};

export default StudentDashboard;