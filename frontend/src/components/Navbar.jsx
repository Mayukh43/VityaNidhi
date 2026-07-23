import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleLogout = () => {

        localStorage.clear();
        navigate("/login");

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

                .navbar{

                    width:100%;
                    background:linear-gradient(
135deg,
#F5F9FF,
#DCEEFF,
#C8E4FF
);
                    padding:18px 40px;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    box-shadow:0 5px 20px rgba(26, 66, 104, 0.2);

                }

                .logo{

                    color: #443fc6;
                    font-size:28px;
                    font-weight:bold;
                    letter-spacing:1px;

                }

                .nav{

                    position:relative;

                }

                .container {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 6px;
  
  /* --- Transparent Glassmorphism Changes --- */
  background: rgba(237, 242, 255, 0.4); /* Semi-transparent version of your original color */
  backdrop-filter: blur(6px);            /* Blurs what's underneath */
  -webkit-backdrop-filter: blur(6px);    /* Safari support */
  border: 1px solid rgba(165, 180, 252, 0.4); /* Super soft, transparent indigo border */
  
  /* Smooth transition for the hover animation */
  transition: all 0.25s ease-in-out;
  cursor: pointer; 
}

                .btn{

                    text-decoration:none;
                    color:black;
                    padding:10px 18px;
                    border-radius:4px;
                    transition:.3s;
                    font-size:16px;
                    white-space:nowrap;

                }

                .btn:hover{

                    background: rgba(237, 242, 255, 0.85);  /* Fills in more solid on hover */
  border-color: #6366F1;                  /* Border shifts to a sharp Indigo */
  transform: translateY(-2px);            /* Subtle, clean physical lift */
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.12); /* Soft glowing aura shadow */
                }

                .logout{

                    border:none;
                    background:#d32f2f;
                    color:white;
                    padding:10px 18px;
                    cursor:pointer;
                    border-radius:5px;
                    font-size:15px;
                    transition:.3s;

                }

                .logout:hover{

                    background:#b71c1c;

                }

            `}</style>

            <nav className="navbar">

                <div className="logo">

                    VidyaNidhi

                </div>

                <div className="nav">

                    <div className="container">

                        <Link className="btn" to="/">
                            Home
                        </Link>

                        {
                            token && role === "student" && (

                                <>

                                    <Link className="btn" to="/dashboard">
                                        Dashboard
                                    </Link>

                                    <Link className="btn" to="/scholarships">
                                        Scholarships
                                    </Link>

                                    <Link className="btn" to="/applications">
                                        My Applications
                                    </Link>

                                    <Link className="btn" to="/recommendations">
                                        AI Recommendation
                                    </Link>

                                    <Link className="btn" to="/chat">
                                        AI Chat
                                    </Link>

                                    <Link className="btn" to="/compare">
                                        Compare
                                    </Link>

                                </>

                            )
                        }

                        {
                            token && role === "admin" && (

                                <>

                                    <Link className="btn" to="/admin-dashboard">
                                        Dashboard
                                    </Link>

                                    <Link className="btn" to="/admin/add-scholarship">
                                        Add Scholarship
                                    </Link>

                                    <Link className="btn" to="/admin/scholarships">
                                        Manage Scholarships
                                    </Link>

                                    <Link className="btn" to="/admin/applications">
                                        Applications
                                    </Link>

                                    <Link className="btn" to="/admin/analytics">
                                        Analytics
                                    </Link>

                                </>

                            )
                        }

                        {
                            !token && (

                                <>

                                    <Link className="btn" to="/login">
                                        Login
                                    </Link>

                                    <Link className="btn" to="/register">
                                        Student Register
                                    </Link>

                                    <Link className="btn" to="/admin-register">
                                        Admin Register
                                    </Link>

                                </>

                            )
                        }

                        {
                            token && (

                                <button
                                    className="logout"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>

                            )
                        }

                    </div>

                </div>

            </nav>

        </>

    );

};

export default Navbar;