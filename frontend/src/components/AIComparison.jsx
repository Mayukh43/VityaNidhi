import { useEffect, useState } from "react";
import axios from "axios";

const AIComparison = () => {

    const token = localStorage.getItem("token");

    const [scholarships, setScholarships] = useState([]);

    const [scholarship1Id, setScholarship1Id] = useState("");

    const [scholarship2Id, setScholarship2Id] = useState("");

    const [comparison, setComparison] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        fetchScholarships();

    }, []);

    // =====================================
    // Fetch Scholarships
    // =====================================

    const fetchScholarships = async () => {

        try {

            const response = await axios.get(

                "http://localhost:5200/api/scholarships",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            console.log(response.data);

            // Backend returns:
            // {
            //     total: ...,
            //     scholarships: [...]
            // }

            setScholarships(

                response.data.scholarships || []

            );

        }

        catch (error) {

            console.log(error);

            alert("Unable to load scholarships.");

        }

    };

    // =====================================
    // Compare Scholarships
    // =====================================

    const compareScholarships = async () => {

        if (!scholarship1Id || !scholarship2Id) {

            return alert("Please select both scholarships.");

        }

        if (scholarship1Id === scholarship2Id) {

            return alert("Please choose two different scholarships.");

        }

        try {

            setLoading(true);

            const response = await axios.post(

                "http://localhost:5200/api/ai/compare",

                {

                    scholarship1Id,

                    scholarship2Id

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setComparison(response.data.comparison);

        }

        catch (error) {

            console.log(error);

            alert(

                error.response?.data?.message ||

                "Comparison failed."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div style={{ padding: "30px" }} className="comparisonContainer">

            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: Arial, Helvetica, sans-serif;
                }

                .comparisonContainer {
                    min-height: 90vh;
                    background: linear-gradient(135deg, #F8FAFC, #EAF3FF, #DCEEFF);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .comparisonContainer > h1 {
                    color: #0F172A;
                    font-size: 28px;
                    font-weight: 800;
                    width: 100%;
                    max-width: 850px;
                }

                .comparisonContainer > hr {
                    width: 100%;
                    max-width: 850px;
                    border: none;
                    height: 3px;
                    background: linear-gradient(90deg, #2563EB, transparent);
                    margin: 12px 0 24px 0;
                }

                .comparisonContainer > h3 {
                    color: #334155;
                    font-size: 15px;
                    font-weight: 700;
                    width: 100%;
                    max-width: 850px;
                    margin-bottom: 8px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .comparisonContainer select {
                    width: 100%;
                    max-width: 850px;
                    padding: 12px 16px;
                    border-radius: 10px;
                    border: 1px solid #CBD5E1;
                    background: #FFFFFF;
                    font-size: 15px;
                    color: #0F172A;
                    outline: none;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                    cursor: pointer;
                }

                .comparisonContainer select:focus {
                    border-color: #2563EB;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
                }

                .comparisonContainer > button {
                    padding: 14px 36px;
                    background: #2563EB;
                    color: #FFFFFF;
                    border: none;
                    border-radius: 10px;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
                }

                .comparisonContainer > button:hover:not(:disabled) {
                    background: #1D4ED8;
                    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.35);
                    transform: translateY(-2px);
                }

                .comparisonContainer > button:disabled {
                    background: #94A3B8;
                    cursor: not-allowed;
                    box-shadow: none;
                }

                /* Results Card Styling */
                .comparisonContainer > div[style*="border"] {
                    width: 100%;
                    max-width: 850px;
                    border: 1px solid rgba(219, 234, 254, 0.8) !important;
                    background: rgba(255, 255, 255, 0.75) !important;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border-radius: 16px !important;
                    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.06);
                }

                .comparisonContainer > div[style*="border"] h2 {
                    color: #0F172A;
                    font-size: 22px;
                    font-weight: 800;
                    margin-bottom: 12px;
                }

                .comparisonContainer > div[style*="border"] h3 {
                    color: #1E293B;
                    font-size: 16px;
                    font-weight: 700;
                    margin-top: 10px;
                    margin-bottom: 6px;
                }

                .comparisonContainer > div[style*="border"] p {
                    color: #334155;
                    font-size: 15px;
                    line-height: 1.6;
                }

                .comparisonContainer > div[style*="border"] hr {
                    border: none;
                    height: 1px;
                    background: #E2E8F0;
                    margin: 14px 0;
                }

                .comparisonContainer ul {
                    padding-left: 20px;
                    margin-top: 8px;
                }

                .comparisonContainer li {
                    color: #334155;
                    font-size: 14px;
                    margin-bottom: 6px;
                    line-height: 1.5;
                }
            `}</style>

            <h1>AI Scholarship Comparison</h1>

            <hr />

            <h3>Select Scholarship 1</h3>

            <select

                value={scholarship1Id}

                onChange={(e) => setScholarship1Id(e.target.value)}

            >

                <option value="">

                    Select Scholarship

                </option>

                {

                    Array.isArray(scholarships) &&

                    scholarships.map((item) => (

                        <option

                            key={item._id}

                            value={item._id}

                        >

                            {item.scholarshipName}

                        </option>

                    ))

                }

            </select>

            <br /><br />

            <h3>Select Scholarship 2</h3>

            <select

                value={scholarship2Id}

                onChange={(e) => setScholarship2Id(e.target.value)}

            >

                <option value="">

                    Select Scholarship

                </option>

                {

                    Array.isArray(scholarships) &&

                    scholarships.map((item) => (

                        <option

                            key={item._id}

                            value={item._id}

                        >

                            {item.scholarshipName}

                        </option>

                    ))

                }

            </select>

            <br /><br />

            <button

                onClick={compareScholarships}

                disabled={loading}

            >

                {

                    loading

                        ? "Comparing..."

                        : "Compare with AI"

                }

            </button>

            <br /><br />

            {

                comparison && (

                    <div

                        style={{

                            border: "1px solid gray",

                            padding: "20px",

                            borderRadius: "10px",

                            backgroundColor: "#f8f8f8"

                        }}

                    >

                        <h2>AI Comparison Result</h2>

                        <hr />

                        <h3>Scholarship 1</h3>

                        <p>

                            <strong>

                                {comparison.scholarship1}

                            </strong>

                        </p>

                        <hr />

                        <h3>Scholarship 2</h3>

                        <p>

                            <strong>

                                {comparison.scholarship2}

                            </strong>

                        </p>

                        <hr />

                        <h3>Best</h3>

                        <p>

                            <strong>

                                {comparison.winner}

                            </strong>

                        </p>

                        <hr />

                        <h3>Advantages</h3>

                        {

                            comparison.advantages?.length > 0 ? (

                                <ul>

                                    {

                                        comparison.advantages.map((item, index) => (

                                            <li key={index}>

                                                {item}

                                            </li>

                                        ))

                                    }

                                </ul>

                            ) : (

                                <p>No advantages available.</p>

                            )

                        }

                        <hr />

                        <h3>Disadvantages</h3>

                        {

                            comparison.disadvantages?.length > 0 ? (

                                <ul>

                                    {

                                        comparison.disadvantages.map((item, index) => (

                                            <li key={index}>

                                                {item}

                                            </li>

                                        ))

                                    }

                                </ul>

                            ) : (

                                <p>No disadvantages available.</p>

                            )

                        }

                        <hr />

                        <h3>AI Recommendation</h3>

                        <p>

                            {comparison.recommendation}

                        </p>

                    </div>

                )

            }

        </div>

    );

};

export default AIComparison;