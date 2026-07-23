import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditScholarship = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({

        scholarshipName: "",
        provider: "",
        scholarshipType: "Government",
        description: "",
        amount: "",
        minimumQualification: "",
        eligibleCategories: "",
        eligibleStates: "",
        gender: "Any",
        maximumFamilyIncome: "",
        minimumPercentage: "",
        minimumAge: "",
        maximumAge: "",
        applicationDeadline: "",
        requiredDocuments: "",
        officialWebsite: ""

    });

    useEffect(() => {

        fetchScholarship();

    }, []);

    const fetchScholarship = async () => {

        try {

            const response = await axios.get(

                `http://localhost:5200/api/scholarships/${id}`

            );

            const s = response.data;

            setFormData({

                scholarshipName: s.scholarshipName,
                provider: s.provider,
                scholarshipType: s.scholarshipType || "Government",
                description: s.description,
                amount: s.amount,
                minimumQualification: s.minimumQualification,
                eligibleCategories: s.eligibleCategories ? s.eligibleCategories.join(", ") : "",
                eligibleStates: s.eligibleStates ? s.eligibleStates.join(", ") : "",
                gender: s.gender || "Any",
                maximumFamilyIncome: s.maximumFamilyIncome,
                minimumPercentage: s.minimumPercentage || "",
                minimumAge: s.minimumAge || "",
                maximumAge: s.maximumAge || "",
                applicationDeadline: s.applicationDeadline ? s.applicationDeadline.substring(0, 10) : "",
                requiredDocuments: s.requiredDocuments ? s.requiredDocuments.join(", ") : "",
                officialWebsite: s.officialWebsite

            });

        }

        catch (error) {

            alert("Unable to load scholarship.");

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.put(

                `http://localhost:5200/api/scholarships/${id}`,

                {

                    ...formData,
                    amount: Number(formData.amount),
                    maximumFamilyIncome: Number(formData.maximumFamilyIncome),
                    minimumPercentage: formData.minimumPercentage ? Number(formData.minimumPercentage) : undefined,
                    minimumAge: formData.minimumAge ? Number(formData.minimumAge) : undefined,
                    maximumAge: formData.maximumAge ? Number(formData.maximumAge) : undefined,

                    eligibleCategories: formData.eligibleCategories
                        .split(",")
                        .map(item => item.trim())
                        .filter(item => item !== ""),

                    eligibleStates: formData.eligibleStates
                        .split(",")
                        .map(item => item.trim())
                        .filter(item => item !== ""),

                    requiredDocuments: formData.requiredDocuments
                        .split(",")
                        .map(item => item.trim())
                        .filter(item => item !== "")

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            alert("Scholarship Updated Successfully");

            navigate("/admin/scholarships");

        }

        catch (error) {

            alert(error.response?.data?.message || "Update Failed");

        }

    };

    return (

        <>
            <style>{`

                *{
                    margin:0;
                    padding:0;
                    box-sizing:border-box;
                    font-family:Arial, Helvetica, sans-serif;
                }

                .formPage{

                    min-height:90vh;
                    background: linear-gradient(135deg,#F8FAFC,#EAF3FF,#DCEEFF);
                    padding:50px 40px;
                    display:flex;
                    justify-content:center;
                    align-items:flex-start;

                }

                .formContainer{

                    width:100%;
                    max-width:1000px;
                    background: rgba(255, 255, 255, 0.45);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border-radius:25px;
                    padding:45px;
                    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02);
                    border: 1px solid rgba(219, 234, 254, 0.7);

                }

                .formHeader{

                    margin-bottom:35px;

                }

                .formHeader h1{

                    color:#1E293B;
                    font-size:36px;
                    font-weight: 800;
                    margin-bottom:12px;

                }

                .formHeader hr{

                    border: none;
                    height: 3px;
                    background: linear-gradient(90deg, #2563EB, transparent);
                    border-radius:2px;

                }

                .formGrid{

                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;

                }

                @media (max-width: 768px) {
                    .formGrid {
                        grid-template-columns: 1fr;
                    }
                }

                .fullWidth{

                    grid-column: span 2;

                }

                @media (max-width: 768px) {
                    .fullWidth {
                        grid-column: span 1;
                    }
                }

                .inputGroup{

                    display: flex;
                    flex-direction: column;

                }

                .inputGroup label{

                    color:#1E293B;
                    margin-bottom:8px;
                    font-size:14px;
                    font-weight: 600;

                }

                .inputGroup input, .inputGroup select, .inputGroup textarea{

                    width:100%;
                    padding:14px;
                    border:1px solid rgba(191, 219, 254, 0.8);
                    outline:none;
                    border-radius:12px;
                    background:#F8FAFC;
                    color:#0F172A;
                    font-size:15px;
                    transition:.3s;

                }

                .inputGroup textarea {

                    resize: vertical;
                    min-height: 100px;
                    font-family: inherit;

                }

                .inputGroup select {

                    cursor: pointer;
                    appearance: none;
                    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
                    background-repeat: no-repeat;
                    background-position: right 16px center;
                    background-size: 16px;
                    padding-right: 40px;

                }

                .inputGroup input::placeholder, .inputGroup textarea::placeholder{

                    color:#94A3B8;

                }

                .inputGroup input:focus, .inputGroup select:focus, .inputGroup textarea:focus{

                    background:#FFFFFF;
                    border-color: #2563EB;
                    box-shadow:0 0 0 4px rgba(37, 99, 235, 0.15);

                }

                .submitBtnContainer{

                    margin-top:30px;
                    display: flex;
                    justify-content: flex-end;

                }

                .submitBtn{

                    padding:16px 40px;
                    border:none;
                    border-radius:12px;
                    background:#2563EB;
                    color:white;
                    font-size:16px;
                    font-weight:bold;
                    cursor:pointer;
                    transition:.3s;
                    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);

                }

                .submitBtn:hover{

                    background:#1D4ED8;
                    transform:translateY(-2px);
                    box-shadow: 0 6px 20px rgba(29, 78, 216, 0.3);

                }

            `}</style>

            <div className="formPage">

                <div className="formContainer">

                    <div className="formHeader">

                        <h1>Edit Scholarship Details</h1>

                        <hr />

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="formGrid">

                            <div className="inputGroup">

                                <label>Scholarship Name</label>

                                <input
                                    type="text"
                                    name="scholarshipName"
                                    placeholder="e.g. Merit-cum-Means Scholarship"
                                    value={formData.scholarshipName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="inputGroup">

                                <label>Provider</label>

                                <input
                                    type="text"
                                    name="provider"
                                    placeholder="e.g. Ministry of Minority Affairs"
                                    value={formData.provider}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="inputGroup">

                                <label>Scholarship Type</label>

                                <select
                                    name="scholarshipType"
                                    value={formData.scholarshipType}
                                    onChange={handleChange}
                                >
                                    <option value="Government">Government</option>
                                    <option value="Private">Private</option>
                                </select>

                            </div>

                            <div className="inputGroup">

                                <label>Scholarship Amount (₹)</label>

                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="Enter amount in INR"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="inputGroup fullWidth">

                                <label>Description</label>

                                <textarea
                                    name="description"
                                    placeholder="Provide clear specifications about the scholarship timeline, benefits, and objectives..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="inputGroup">

                                <label>Minimum Qualification Required</label>

                                <input
                                    type="text"
                                    name="minimumQualification"
                                    placeholder="e.g. Class 12, B.Tech, Graduation"
                                    value={formData.minimumQualification}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="inputGroup">

                                <label>Minimum Academic Percentage Required (%)</label>

                                <input
                                    type="number"
                                    name="minimumPercentage"
                                    placeholder="e.g. 60"
                                    value={formData.minimumPercentage}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="inputGroup">

                                <label>Eligible Categories (Comma separated)</label>

                                <input
                                    type="text"
                                    name="eligibleCategories"
                                    placeholder="General, OBC, SC, ST"
                                    value={formData.eligibleCategories}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="inputGroup">

                                <label>Eligible States (Comma separated)</label>

                                <input
                                    type="text"
                                    name="eligibleStates"
                                    placeholder="Odisha, West Bengal, National"
                                    value={formData.eligibleStates}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="inputGroup">

                                <label>Gender Preference</label>

                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="Any">Any</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>

                            </div>

                            <div className="inputGroup">

                                <label>Maximum Allowed Family Income (₹/Year)</label>

                                <input
                                    type="number"
                                    name="maximumFamilyIncome"
                                    placeholder="e.g. 250000"
                                    value={formData.maximumFamilyIncome}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="inputGroup">

                                <label>Minimum Age Limit</label>

                                <input
                                    type="number"
                                    name="minimumAge"
                                    placeholder="Leave blank if none"
                                    value={formData.minimumAge}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="inputGroup">

                                <label>Maximum Age Limit</label>

                                <input
                                    type="number"
                                    name="maximumAge"
                                    placeholder="Leave blank if none"
                                    value={formData.maximumAge}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="inputGroup">

                                <label>Application Deadline</label>

                                <input
                                    type="date"
                                    name="applicationDeadline"
                                    value={formData.applicationDeadline}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="inputGroup">

                                <label>Official Website Link</label>

                                <input
                                    type="url"
                                    name="officialWebsite"
                                    placeholder="https://example.com"
                                    value={formData.officialWebsite}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="inputGroup fullWidth">

                                <label>Required Documents (Comma separated)</label>

                                <input
                                    type="text"
                                    name="requiredDocuments"
                                    placeholder="Aadhaar Card, Income Certificate, Marksheet, College ID"
                                    value={formData.requiredDocuments}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <div className="submitBtnContainer">

                            <button type="submit" className="submitBtn">
                                Update Scholarship
                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </>

    );

};

export default EditScholarship;