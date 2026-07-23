import { useEffect, useState } from "react";
import axios from "axios";

const MyApplications = () => {

    const token = localStorage.getItem("token");

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchApplications();

    }, []);

    const fetchApplications = async () => {

        try {

            const response = await axios.get(

                "http://localhost:5200/api/applications/my",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setApplications(response.data);

        }

        catch (error) {

            console.log(error);

            alert("Unable to load applications.");

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
                <h2>Loading Applications...</h2>
            </div>
        );

    }

    return (

        <div className="applicationsContainer">

            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: Arial, Helvetica, sans-serif;
                }

                .applicationsContainer {
                    min-height: 90vh;
                    background: linear-gradient(135deg, #F8FAFC, #EAF3FF, #DCEEFF);
                    padding: 40px 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .applicationsContainer > h1 {
                    color: #0F172A;
                    font-size: 28px;
                    font-weight: 800;
                    width: 100%;
                    max-width: 800px;
                }

                .applicationsContainer > hr {
                    width: 100%;
                    max-width: 800px;
                    border: none;
                    height: 3px;
                    background: linear-gradient(90deg, #2563EB, transparent);
                    margin: 12px 0 28px 0;
                }

                .applicationsContainer > h3 {
                    color: #64748B;
                    font-size: 18px;
                    margin-top: 40px;
                    background: rgba(255, 255, 255, 0.7);
                    padding: 30px 50px;
                    border-radius: 16px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
                }

                /* Application Card Styling */
                .applicationsContainer > div {
                    width: 100%;
                    max-width: 800px;
                    background: rgba(255, 255, 255, 0.75);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border-radius: 16px;
                    padding: 24px 30px;
                    margin-bottom: 20px;
                    border: 1px solid rgba(219, 234, 254, 0.8);
                    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.06);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .applicationsContainer > div:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 25px rgba(37, 99, 235, 0.12);
                }

                .applicationsContainer > div > h2 {
                    color: #1E293B;
                    font-size: 20px;
                    font-weight: 700;
                    margin-bottom: 12px;
                }

                .applicationsContainer > div > p {
                    font-size: 14px;
                    color: #475569;
                    margin: 8px 0;
                }

                .applicationsContainer > div > p strong {
                    color: #0F172A;
                }

                .applicationsContainer > div > hr {
                    border: none;
                    height: 1px;
                    background: #E2E8F0;
                    margin-top: 16px;
                }
            `}</style>

            <h1>My Scholarship Applications</h1>

            <hr />

            {

                applications.length === 0 ?

                (

                    <h3>No Applications Found</h3>

                )

                :

                (

                    applications.map((application) => (

                        <div key={application._id}>

                            <h2>

                                {application.scholarship.scholarshipName}

                            </h2>

                            <p>

                                <strong>Provider:</strong>{" "}

                                {application.scholarship.provider}

                            </p>

                            <p>

                                <strong>Amount:</strong>{" "}

                                ₹{application.scholarship.amount}

                            </p>

                            <p>

                                <strong>Status:</strong>{" "}

                                {application.status}

                            </p>

                            <p>

                                <strong>Applied On:</strong>{" "}

                                {

                                    new Date(

                                        application.createdAt

                                    ).toLocaleDateString()

                                }

                            </p>

                            <hr />

                        </div>

                    ))

                )

            }

        </div>

    );

};

export default MyApplications;