import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        email: "",

        password: "",

        role: "student"

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await axios.post(

                "http://localhost:5200/api/auth/login",

                {
                    email: formData.email,
                    password: formData.password
                }

            );

            const data = response.data;

            // Check whether selected role matches database role
            if (formData.role !== data.role) {

                alert("Incorrect role selected.");

                setLoading(false);

                return;

            }

            // Save Login Details

            localStorage.setItem("token", data.token);

            localStorage.setItem("userId", data._id);

            localStorage.setItem("name", data.name);

            localStorage.setItem("email", data.email);

            localStorage.setItem("role", data.role);

            alert(data.message);

            // Redirect Based on Role

            if (data.role === "admin") {

                navigate("/admin-dashboard");

            }

            else {

                navigate("/dashboard");

            }

        }

        catch (error) {

            if (error.response) {

                alert(error.response.data.message);

            }

            else {

                alert("Unable to connect to server.");

            }

        }

        setLoading(false);

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

            .registerPage{

                min-height:90vh;
                display:flex;
                justify-content:center;
                align-items:center;
                background:
                linear-gradient(135deg,#F8FAFC,#EAF3FF,#DCEEFF);
                padding:40px;

            }

            .registerCard{

                width:430px;
                background: rgba(255, 255, 255, 0.45);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                border-radius:25px;
                padding:45px;
                box-shadow: 0 10px 30px rgba(37, 99, 235, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02);
                border: 1px solid rgba(219, 234, 254, 0.7);

            }

            .registerCard h1{

                color:#3B82F6;
                font-size:36px;
                line-height: 1.2;
                margin-bottom:35px;
                font-weight: 800;

            }

            .inputGroup{

                margin-bottom:22px;

            }

            .inputGroup label{

                color:#1E293B;
                display:block;
                margin-bottom:8px;
                font-size:15px;
                font-weight: 600;

            }

            .inputGroup input, .inputGroup select{

                width:100%;
                padding:16px;
                border:1px solid rgba(191, 219, 254, 0.8);
                outline:none;
                border-radius:14px;
                background:#F8FAFC;
                color:#0F172A;
                font-size:16px;
                transition:.3s;

            }

            .inputGroup select {

    cursor: pointer;
    appearance: none; /* Hides default ugly browser arrow */
    
    /* Adds a modern, crisp SVG Chevron Arrow */
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 16px center;
    background-size: 16px;
    padding-right: 40px; /* Prevents text from overlapping the arrow */

}

            .inputGroup input::placeholder{

                color:#64748B;

            }

            .inputGroup input:focus, .inputGroup select:focus{

                background:#FFFFFF;
                border-color: #2563EB;
                box-shadow:0 0 0 4px rgba(37, 99, 235, 0.15);

            }

            .registerBtn{

                width:100%;
                margin-top:12px;
                padding:18px;
                border:none;
                border-radius:14px;
                background:#2563EB;
                color:white;
                font-size:18px;
                font-weight:bold;
                cursor:pointer;
                transition:.3s;
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);

            }

            .registerBtn:hover{

                background:#1D4ED8;
                transform:translateY(-2px);
                box-shadow: 0 6px 20px rgba(29, 78, 216, 0.3);

            }

            .registerBtn:disabled{

                background:#94A3B8;
                cursor:not-allowed;
                transform:none;
                box-shadow: none;

            }

        `}</style>

        <div className="registerPage">

            <div className="registerCard">

                <h1>

                    Login to VidyaNidhi

                </h1>

                <form onSubmit={handleSubmit}>

                    <div className="inputGroup">

                        <label>

                            Login As

                        </label>

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >

                            <option value="student">

                                Student

                            </option>

                            <option value="admin">

                                Admin

                            </option>

                        </select>

                    </div>

                    <div className="inputGroup">

                        <label>

                            Email Address

                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="inputGroup">

                        <label>

                            Password

                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button
                        className="registerBtn"
                        type="submit"
                        disabled={loading}
                    >

                        {

                            loading

                                ? "Logging In..."

                                : "Login"

                        }

                    </button>

                </form>

                <div
                    style={{
                        marginTop: "25px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >

                    <p
                        style={{
                            color: "#1E293B",
                            fontSize: "15px"
                        }}
                    >

                        Student Registration?{" "}

                        <Link
                            to="/register"
                            style={{
                                color: "#2563EB",
                                textDecoration: "none",
                                fontWeight: "bold"
                            }}
                        >

                            Register Here

                        </Link>

                    </p>

                    <p
                        style={{
                            color: "#1E293B",
                            fontSize: "15px"
                        }}
                    >

                        Admin Registration?{" "}

                        <Link
                            to="/admin-register"
                            style={{
                                color: "#2563EB",
                                textDecoration: "none",
                                fontWeight: "bold"
                            }}
                        >

                            Register Here

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    </>

);

};

export default Login;