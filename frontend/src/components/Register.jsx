import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        password: ""

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

                "http://localhost:5200/api/auth/register",

                formData

            );

            alert(response.data.message);

            navigate("/login");

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
                font-size:42px;
                margin-bottom:10px;
                font-weight: 800;

            }

            .subtitle{

                color:#3B4260;
                font-size:16px;
                margin-bottom:35px;

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

            .inputGroup input{

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

            .inputGroup input::placeholder{

                color:#64748B;

            }

            .inputGroup input:focus{

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

                    Welcome

                </h1>

                <p className="subtitle">

                    Let's create your student account!

                </p>

                <form onSubmit={handleSubmit}>

                    <div className="inputGroup">

                        <label>

                            Full Name

                        </label>

                        <input

                            type="text"

                            name="name"

                            placeholder="Enter your full name"

                            value={formData.name}

                            onChange={handleChange}

                            required

                        />

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

                            placeholder="Create a password"

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

                                ? "Registering..."

                                : "Create Account"

                        }

                    </button>

                </form>

                <div
                    style={{
                        marginTop: "25px",
                        textAlign: "center"
                    }}
                >

                    <p
                        style={{
                            color: "#1E293B",
                            fontSize: "15px"
                        }}
                    >

                        Already have an account?

                        {" "}

                        <Link
                            to="/login"
                            style={{
                                color: "#2563EB",
                                textDecoration: "none",
                                fontWeight: "bold"
                            }}
                        >

                            Login

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    </>

);

};

export default Register;