import { useEffect, useState } from "react";
import axios from "axios";

import AnalyticsCard from "./AnalyticsCard";
import ScholarshipApplicationTable from "./ScholarshipApplicationTable";

const AdminAnalytics = () => {

    const token = localStorage.getItem("token");

    const [analytics, setAnalytics] = useState({

        totalStudents: 0,

        totalScholarships: 0,

        totalApplications: 0,

        pending: 0,

        approved: 0,

        rejected: 0,

        underReview: 0,

        applicationsPerScholarship: []

    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchAnalytics();

    }, []);

    const fetchAnalytics = async () => {

        try {

            const response = await axios.get(

                "http://localhost:5200/api/analytics",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setAnalytics(response.data);

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to load analytics."

            );

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2>Loading Analytics...</h2>;

    }

    return (

        <div style={{ padding: "30px" }}>

            <h1>Admin Analytics Dashboard</h1>

            <hr />

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    marginTop: "30px"
                }}
            >

                <AnalyticsCard
                    title="Total Students"
                    value={analytics.totalStudents}
                    color="#1976d2"
                />

                <AnalyticsCard
                    title="Total Scholarships"
                    value={analytics.totalScholarships}
                    color="#388e3c"
                />

                <AnalyticsCard
                    title="Total Applications"
                    value={analytics.totalApplications}
                    color="#f57c00"
                />

                <AnalyticsCard
                    title="Pending Applications"
                    value={analytics.pending}
                    color="#ff9800"
                />
                                <AnalyticsCard
                    title="Approved Applications"
                    value={analytics.approved}
                    color="#2e7d32"
                />

                <AnalyticsCard
                    title="Rejected Applications"
                    value={analytics.rejected}
                    color="#d32f2f"
                />

                <AnalyticsCard
                    title="Under Review"
                    value={analytics.underReview}
                    color="#7b1fa2"
                />

            </div>

            <ScholarshipApplicationTable

                data={analytics.applicationsPerScholarship}

            />

        </div>

    );

};

export default AdminAnalytics;