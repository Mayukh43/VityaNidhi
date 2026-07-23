import { useEffect, useState } from "react";
import axios from "axios";

const AIRecommendations = () => {

    const [recommendations, setRecommendations] = useState([]);

    const [aiExplanation, setAiExplanation] = useState("");

    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {

        fetchRecommendations();

    }, []);

    const fetchRecommendations = async () => {

        try {

            const response = await axios.get(

                "http://localhost:5200/api/ai/recommendations",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setRecommendations(response.data.recommendations);

            setAiExplanation(response.data.aiExplanation);

        }

        catch (error) {

            console.log(error);

            alert(

                error.response?.data?.message ||

                "Unable to load recommendations."

            );

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="loadingWrapper">
                <style>{`
                    .loadingWrapper {
                        min-height: 90vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: linear-gradient(135deg, #F8FAFC, #EAF3FF, #DCEEFF);
                        font-family: Arial, Helvetica, sans-serif;
                    }
                    .loadingWrapper h2 {
                        color: #2563EB;
                        font-size: 22px;
                        font-weight: 700;
                    }
                `}</style>
                <h2>Loading AI Recommendations...</h2>
            </div>
        );

    }

    return (

        <div style={{ padding: "30px" }} className="recommendationsContainer">

            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: Arial, Helvetica, sans-serif;
                }

                .recommendationsContainer {
                    min-height: 90vh;
                    background: linear-gradient(135deg, #F8FAFC, #EAF3FF, #DCEEFF);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .recommendationsContainer > h1 {
                    color: #0F172A;
                    font-size: 28px;
                    font-weight: 800;
                    width: 100%;
                    max-width: 850px;
                }

                .recommendationsContainer > hr {
                    width: 100%;
                    max-width: 850px;
                    border: none;
                    height: 3px;
                    background: linear-gradient(90deg, #2563EB, transparent);
                    margin: 12px 0 24px 0;
                }

                .recommendationsContainer > h3 {
                    color: #64748B;
                    font-size: 18px;
                    margin-top: 20px;
                    background: rgba(255, 255, 255, 0.7);
                    padding: 30px 50px;
                    border-radius: 16px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
                }

                /* Recommendation Cards */
                .recommendationsContainer > div[style*="border"] {
                    width: 100%;
                    max-width: 850px;
                    border: 1px solid rgba(219, 234, 254, 0.8) !important;
                    background: rgba(255, 255, 255, 0.75) !important;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border-radius: 16px !important;
                    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.06);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .recommendationsContainer > div[style*="border"]:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 25px rgba(37, 99, 235, 0.12);
                }

                .recommendationsContainer h2 {
                    color: #1E293B;
                    font-size: 20px;
                    font-weight: 700;
                    margin-bottom: 12px;
                }

                .recommendationsContainer p {
                    font-size: 14px;
                    color: #475569;
                    margin: 8px 0;
                }

                .recommendationsContainer p strong {
                    color: #0F172A;
                }

                .recommendationsContainer > h2 {
                    width: 100%;
                    max-width: 850px;
                    margin-top: 15px;
                    margin-bottom: 12px;
                }

                /* AI Explanation Text Block */
                .recommendationsContainer pre {
                    color: #334155;
                    font-size: 15px;
                    line-height: 1.6;
                }
            `}</style>

            <h1>AI Scholarship Recommendations</h1>

            <hr />

            {

                recommendations.length === 0 ?

                (

                    <h3>No matching scholarships found.</h3>

                )

                :

                (

                    recommendations.map((scholarship, index) => (

                        <div

                            key={index}

                            style={{

                                border: "1px solid gray",

                                padding: "20px",

                                marginBottom: "20px",

                                borderRadius: "8px"

                            }}

                        >

                            <h2>

                                {scholarship.scholarshipName}

                            </h2>

                            <p>

                                <strong>Provider :</strong>

                                {" "}

                                {scholarship.provider}

                            </p>

                            <p>

                                <strong>Amount :</strong>

                                ₹{scholarship.amount}

                            </p>

                            <p>

                                <strong>Match Score :</strong>

                                {scholarship.score}%

                            </p>

                            <p>

                                <strong>Eligibility :</strong>

                                {

                                    scholarship.eligible

                                    ?

                                    " Eligible"

                                    :

                                    " Not Eligible"

                                }

                            </p>

                        </div>

                    ))

                )

            }

            <hr />

            <h2>AI Explanation</h2>

            <div

                style={{

                    border: "1px solid gray",

                    padding: "20px",

                    borderRadius: "8px",

                    backgroundColor: "#f7f7f7"

                }}

            >

                <pre

                    style={{

                        whiteSpace: "pre-wrap",

                        fontFamily: "inherit"

                    }}

                >

                    {aiExplanation}

                </pre>

            </div>

        </div>

    );

};

export default AIRecommendations;