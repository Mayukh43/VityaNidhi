import { Link } from "react-router-dom";

const AdminDashboard = () => {

    return (
          <>

        <style>{`

            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
                font-family:Arial, Helvetica, sans-serif;
            }

            .dashboardPage{

                min-height:90vh;
                background: linear-gradient(135deg,#F8FAFC,#EAF3FF,#DCEEFF);
                padding:50px 40px;
                display:flex;
                justify-content:center;
                align-items:flex-start;

            }

            .dashboardContainer{

                width:100%;
                max-width:1300px;
                background: rgba(255, 255, 255, 0.45);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                border-radius:25px;
                padding:50px;
                box-shadow: 0 10px 30px rgba(37, 99, 235, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02);
                border: 1px solid rgba(219, 234, 254, 0.7);

            }

            .dashboardHeader{

                margin-bottom:40px;

            }

            .dashboardHeader h1{

                color:#1E293B;
                font-size:38px;
                font-weight: 800;
                margin-bottom:14px;

            }

            .dashboardHeader hr{

                border: none;
                height: 3px;
                background: linear-gradient(90deg, #2563EB, transparent);
                border-radius:2px;

            }

            .managementGrid{

                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 30px;

            }

            @media (max-width: 900px) {
                .managementGrid {
                    grid-template-columns: 1fr;
                }
            }

            .managementSection{

                background: rgba(255, 255, 255, 0.7);
                border: 1px solid rgba(219, 234, 254, 0.8);
                padding: 35px;
                border-radius: 20px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                transition: 0.3s;
                min-height: 250px;

            }

            .managementSection:hover{

                transform: translateY(-4px);
                box-shadow: 0 12px 25px -5px rgba(37, 99, 235, 0.12);
                background: #FFFFFF;

            }

            .managementSection h2{

                color: #1E3A8A;
                font-size: 22px;
                font-weight: 700;
                margin-bottom: 25px;
                line-height: 1.3;

            }

            .buttonGroup{

                display: flex;
                flex-direction: column;
                gap: 14px;

            }

            .dashboardBtn{

                width:100%;
                padding:16px;
                border:1px solid #BFDBFE;
                border-radius:12px;
                background:#FFFFFF;
                color:#2563EB;
                font-size:16px;
                font-weight:bold;
                cursor:pointer;
                transition:.2s;
                text-align: center;

            }

            .dashboardBtn:hover{

                background:#2563EB;
                color:white;
                border-color: #2563EB;
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);

            }

            .dashboardBtn.primary{

                background:#2563EB;
                color:white;
                border: none;

            }

            .dashboardBtn.primary:hover{

                background:#1D4ED8;
                box-shadow: 0 4px 12px rgba(29, 78, 216, 0.25);

            }

            .btnLink{

                text-decoration: none;
                display: block;

            }

        `}</style>

        <div className="dashboardPage">

            <div className="dashboardContainer">

                <div className="dashboardHeader">

                    <h1>Admin Dashboard</h1>

                    <hr />

                </div>

                <div className="managementGrid">

                    <div className="managementSection">

                        <h2>Scholarship Management</h2>

                        <div className="buttonGroup">

                            <Link to="/admin/add-scholarship" className="btnLink">

                                <button className="dashboardBtn primary">

                                    Add Scholarship

                                </button>

                            </Link>

                            <Link to="/admin/scholarships" className="btnLink">

                                <button className="dashboardBtn">

                                    Manage Scholarships

                                </button>

                            </Link>

                        </div>

                    </div>

                    <div className="managementSection">

                        <h2>Application Management</h2>

                        <div className="buttonGroup">

                            <Link to="/admin/applications" className="btnLink">

                                <button className="dashboardBtn primary">

                                    View Student Applications

                                </button>

                            </Link>

                        </div>

                    </div>

                    <div className="managementSection">

                        <h2>Analytics Overview</h2>

                        <div className="buttonGroup">

                            <Link to="/admin/analytics" className="btnLink">

                                <button className="dashboardBtn primary">

                                    Analytics Dashboard

                                </button>

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </>

);

};

export default AdminDashboard;