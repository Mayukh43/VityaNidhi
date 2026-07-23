import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const token = localStorage.getItem("token");

    const [profileExists, setProfileExists] = useState(false);

    const [documents, setDocuments] = useState({
        aadhaarCard: null,
        incomeCertificate: null,
        casteCertificate: null,
        domicileCertificate: null,
        marksheet: null,
        disabilityCertificate: null
    });

    const handleDocumentChange = (e) => {
        setDocuments({
            ...documents,
            [e.target.name]: e.target.files[0]
        });
    };

    const [formData, setFormData] = useState({
        dateOfBirth: "",
        gender: "",
        phone: "",
        address: "",
        state: "",
        district: "",
        currentStandard: "",
        highestQualification: "",
        institutionName: "",
        course: "",
        semester: "",
        percentage: "",
        cgpa: "",
        annualIncome: "",
        category: "",
        minority: false,
        disability: false,
        singleGirlChild: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5200/api/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                const profile = response.data;
                setFormData({
                    dateOfBirth: profile.dateOfBirth
                        ? profile.dateOfBirth.split("T")[0]
                        : "",
                    gender: profile.gender || "",
                    phone: profile.phone || "",
                    address: profile.address || "",
                    state: profile.state || "",
                    district: profile.district || "",
                    currentStandard: profile.currentStandard || "",
                    highestQualification: profile.highestQualification || "",
                    institutionName: profile.institutionName || "",
                    course: profile.course || "",
                    semester: profile.semester || "",
                    percentage: profile.percentage || "",
                    cgpa: profile.cgpa || "",
                    annualIncome: profile.annualIncome || "",
                    category: profile.category || "",
                    minority: profile.minority || false,
                    disability: profile.disability || false,
                    singleGirlChild: profile.singleGirlChild || false
                });

                setProfileExists(true);
            } catch (error) {
                if (
                    error.response &&
                    error.response.status === 404
                ) {
                    setProfileExists(false);
                } else {
                    console.log(error);
                }
            }
        };
        fetchProfile();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submitData = new FormData();

            // ===============================
            // Profile Fields
            // ===============================
            Object.keys(formData).forEach((key) => {
                submitData.append(
                    key,
                    formData[key]
                );
            });

            // ===============================
            // Upload Documents
            // ===============================
            Object.keys(documents).forEach((key) => {
                if (documents[key]) {
                    submitData.append(
                        key,
                        documents[key]
                    );
                }
            });

            if (profileExists) {
                const response = await axios.put(
                    "http://localhost:5200/api/profile",
                    submitData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
                alert(response.data.message);
            } else {
                const response = await axios.post(
                    "http://localhost:5200/api/profile",
                    submitData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
                alert(response.data.message);
                setProfileExists(true);
            }
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Server Error"
            );
        }
    };

    return (
        <div className="profileWrapper">
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: Arial, Helvetica, sans-serif;
                }

                .profileWrapper {
                    min-height: 90vh;
                    background: linear-gradient(135deg, #F8FAFC, #EAF3FF, #DCEEFF);
                    padding: 40px 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .profileWrapper > h1 {
                    color: #0F172A;
                    font-size: 28px;
                    font-weight: 800;
                    width: 100%;
                    max-width: 800px;
                }

                .profileWrapper > hr {
                    width: 100%;
                    max-width: 800px;
                    border: none;
                    height: 3px;
                    background: linear-gradient(90deg, #2563EB, transparent);
                    margin: 12px 0 24px 0;
                }

                .profileWrapper > form {
                    width: 100%;
                    max-width: 800px;
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    padding: 35px;
                    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.08);
                    border: 1px solid rgba(219, 234, 254, 0.8);
                }

                .profileWrapper form label {
                    font-size: 13px;
                    font-weight: 700;
                    color: #334155;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .profileWrapper form input[type="text"],
                .profileWrapper form input[type="date"],
                .profileWrapper form input[type="number"],
                .profileWrapper form select,
                .profileWrapper form textarea {
                    width: 100%;
                    padding: 12px 16px;
                    margin-top: 6px;
                    border-radius: 10px;
                    border: 1px solid #CBD5E1;
                    background: #FFFFFF;
                    font-size: 14px;
                    color: #0F172A;
                    outline: none;
                    transition: border-color 0.2s ease;
                }

                .profileWrapper form input[type="text"]:focus,
                .profileWrapper form input[type="date"]:focus,
                .profileWrapper form input[type="number"]:focus,
                .profileWrapper form select:focus,
                .profileWrapper form textarea:focus {
                    border-color: #2563EB;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
                }

                .profileWrapper form input[type="file"] {
                    margin-top: 8px;
                    font-size: 13px;
                    color: #475569;
                }

                .profileWrapper form input[type="checkbox"] {
                    width: 16px;
                    height: 16px;
                    margin-right: 8px;
                    accent-color: #2563EB;
                }

                .profileWrapper form h2 {
                    color: #0F172A;
                    font-size: 20px;
                    font-weight: 800;
                    margin-top: 10px;
                    margin-bottom: 15px;
                }

                .profileWrapper form button[type="submit"] {
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

                .profileWrapper form button[type="submit"]:hover {
                    background: #1D4ED8;
                    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.35);
                    transform: translateY(-2px);
                }
            `}</style>

            <h1>Student Profile</h1>

            <hr />

            <form onSubmit={handleSubmit}>

                <div>

                    <label>Date of Birth</label>

                    <br />

                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />

                </div>

                <br />

                <div>

                    <label>Gender</label>

                    <br />

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >

                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>

                    </select>

                </div>

                <br />

                <div>

                    <label>Phone</label>

                    <br />

                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                </div>

                <br />

                <div>

                    <label>Address</label>

                    <br />

                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                </div>

                <br />

                <div>

                    <label>State</label>

                    <br />

                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />

                </div>

                <br />

                <div>

                    <label>District</label>

                    <br />

                    <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        required
                    />

                </div>

                <br />

                <div>

                    <label>Current Standard</label>

                    <br />

                    <input
                        type="text"
                        name="currentStandard"
                        value={formData.currentStandard}
                        onChange={handleChange}
                        required
                    />

                </div>

                <br />

                <div>

                    <label>Highest Qualification</label>

                    <br />

                    <input
                        type="text"
                        name="highestQualification"
                        value={formData.highestQualification}
                        onChange={handleChange}
                        required
                    />

                </div>

                <br />

                <div>

                    <label>Institution Name</label>

                    <br />

                    <input
                        type="text"
                        name="institutionName"
                        value={formData.institutionName}
                        onChange={handleChange}
                        required
                    />

                </div>

                <br />

                <div>

                    <label>Course</label>

                    <br />

                    <input
                        type="text"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                    />

                </div>

                <br />

                <div>

                    <label>Semester</label>

                    <br />

                    <input
                        type="text"
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                    />

                </div>

                <br />

                <div>

                    <label>Percentage</label>

                    <br />

                    <input
                        type="number"
                        name="percentage"
                        value={formData.percentage}
                        onChange={handleChange}
                    />

                </div>

                <br />

                <div>

                    <label>CGPA</label>

                    <br />

                    <input
                        type="number"
                        step="0.01"
                        name="cgpa"
                        value={formData.cgpa}
                        onChange={handleChange}
                    />

                </div>

                <br />

                <div>

                    <label>Annual Income</label>

                    <br />

                    <input
                        type="number"
                        name="annualIncome"
                        value={formData.annualIncome}
                        onChange={handleChange}
                        required
                    />

                </div>

                <br />

                <div>

                    <label>Category</label>

                    <br />

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >

                        <option value="">Select</option>
                        <option value="General">General</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                        <option value="EWS">EWS</option>

                    </select>

                </div>

                <br />

                <label>

                    <input
                        type="checkbox"
                        name="minority"
                        checked={formData.minority}
                        onChange={handleChange}
                    />

                    Minority Student

                </label>

                <br /><br />

                <label>

                    <input
                        type="checkbox"
                        name="disability"
                        checked={formData.disability}
                        onChange={handleChange}
                    />

                    Person with Disability

                </label>

                <br /><br />

                <label>

                    <input
                        type="checkbox"
                        name="singleGirlChild"
                        checked={formData.singleGirlChild}
                        onChange={handleChange}
                    />

                    Single Girl Child

                </label>

                <br /><br />

                <hr />

                <h2>Upload Documents</h2>

                <div>

                    <label>Aadhaar Card (PDF/JPG/PNG)</label>

                    <br />

                    <input
                        type="file"
                        name="aadhaarCard"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleDocumentChange}
                    />

                </div>

                <br />

                <div>

                    <label>Income Certificate (PDF/JPG/PNG)</label>

                    <br />

                    <input
                        type="file"
                        name="incomeCertificate"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleDocumentChange}
                    />

                </div>

                <br />

                <div>

                    <label>Caste Certificate (PDF/JPG/PNG)</label>

                    <br />

                    <input
                        type="file"
                        name="casteCertificate"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleDocumentChange}
                    />

                </div>

                <br />

                <div>

                    <label>Domicile Certificate (PDF/JPG/PNG)</label>

                    <br />

                    <input
                        type="file"
                        name="domicileCertificate"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleDocumentChange}
                    />

                </div>

                <br />

                <div>

                    <label>Marksheet (PDF/JPG/PNG)</label>

                    <br />

                    <input
                        type="file"
                        name="marksheet"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleDocumentChange}
                    />

                </div>

                <br />

                <div>

                    <label>Disability Certificate (PDF/JPG/PNG)</label>

                    <br />

                    <input
                        type="file"
                        name="disabilityCertificate"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleDocumentChange}
                    />

                </div>

                <br /><br />

                <button type="submit">

                    {

                        profileExists

                            ? "Update Profile"

                            : "Save Profile"

                    }

                </button>

            </form>

        </div>

    );

};

export default Profile;