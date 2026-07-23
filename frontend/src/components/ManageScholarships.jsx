import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ManageScholarships = () => {

    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {

        fetchScholarships();

    }, []);

    const fetchScholarships = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5200/api/scholarships"
            );

            setScholarships(response.data.scholarships);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const deleteScholarship = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this scholarship?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(

                `http://localhost:5200/api/scholarships/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            alert("Scholarship Deleted Successfully");

            fetchScholarships();

        }

        catch (error) {

            alert(error.response?.data?.message || "Delete Failed");

        }

    };

    if (loading) {

        return (
            <>
                <style>{`
                    .loadingState {
                        min-height: 90vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: linear-gradient(135deg,#F8FAFC,#EAF3FF,#DCEEFF);
                        color: #2563EB;
                        font-family: Arial, sans-serif;
                        font-size: 24px;
                        font-weight: bold;
                    }
                `}</style>
                <div className="loadingState">Loading Resources...</div>
            </>
        );

    }

    return (
          <>

        <style>{`

            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
                font-family:Arial, Helvetica, sans-serif;
            }

            .managePage{

                min-height:90vh;
                background: linear-gradient(135deg,#F8FAFC,#EAF3FF,#DCEEFF);
                padding:50px 40px;
                display:flex;
                justify-content:center;
                align-items:flex-start;

            }

            .manageContainer{

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

            .manageHeader{

                margin-bottom:40px;

            }

            .manageHeader h1{

                color:#1E293B;
                font-size:38px;
                font-weight: 800;
                margin-bottom:14px;

            }

            .manageHeader hr{

                border: none;
                height: 3px;
                background: linear-gradient(90deg, #2563EB, transparent);
                border-radius:2px;

            }

            .emptyState{

                text-align: center;
                padding: 60px 20px;
                color: #64748B;
                font-size: 20px;
                font-weight: 600;

            }

            .scholarshipsList{

                display: flex;
                flex-direction: column;
                gap: 20px;

            }

            .scholarshipCard{

                background: rgba(255, 255, 255, 0.75);
                border: 1px solid rgba(219, 234, 254, 0.9);
                padding: 30px;
                border-radius: 20px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 30px;
                transition: 0.25s;

            }

            .scholarshipCard:hover{

                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(37, 99, 235, 0.08);
                background: #FFFFFF;

            }

            .scholarshipInfo{

                flex: 1;

            }

            .scholarshipInfo h2{

                color: #1E293B;
                font-size: 23px;
                font-weight: 700;
                margin-bottom: 12px;

            }

            .metaGrid{

                display: flex;
                flex-wrap: wrap;
                gap: 24px;

            }

            .metaItem{

                color: #475569;
                font-size: 15px;

            }

            .metaItem strong{

                color: #1E293B;

            }

            .amountBadge{

                display: inline-block;
                background: #E0F2FE;
                color: #0369A1;
                padding: 4px 10px;
                border-radius: 8px;
                font-weight: bold;

            }

            .actionGroup{

                display: flex;
                align-items: center;
                gap: 12px;

            }

            .actionBtn{

                padding: 12px 24px;
                border-radius: 10px;
                font-size: 15px;
                font-weight: bold;
                cursor: pointer;
                transition: 0.2s;
                border: none;
                text-align: center;

            }

            .actionBtn.edit{

                background: #2563EB;
                color: white;

            }

            .actionBtn.edit:hover{

                background: #1D4ED8;
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);

            }

            .actionBtn.delete{

                background: #FEE2E2;
                color: #DC2626;

            }

            .actionBtn.delete:hover{

                background: #FCA5A5;
                color: #991B1B;

            }

            .btnLink{

                text-decoration: none;

            }

            @media(max-width: 768px){
                .scholarshipCard{
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 20px;
                }
                .actionGroup{
                    width: 100%;
                }
                .actionBtn{
                    flex: 1;
                }
            }

        `}</style>

        <div className="managePage">

            <div className="manageContainer">

                <div className="manageHeader">

                    <h1>Manage Scholarships</h1>

                    <hr />

                </div>

                {

                    scholarships.length === 0 ?

                        (

                            <div className="emptyState">

                                <h3>No Scholarships Found</h3>

                            </div>

                        )

                        :

                        (

                            <div className="scholarshipsList">

                                {scholarships.map((scholarship) => (

                                    <div className="scholarshipCard" key={scholarship._id}>

                                        <div className="scholarshipInfo">

                                            <h2>{scholarship.scholarshipName}</h2>

                                            <div className="metaGrid">

                                                <div className="metaItem">

                                                    <strong>Provider:</strong> {scholarship.provider}

                                                </div>

                                                <div className="metaItem">

                                                    <strong>Amount:</strong> <span className="amountBadge">₹{scholarship.amount}</span>

                                                </div>

                                                <div className="metaItem">

                                                    <strong>Deadline:</strong> {new Date(scholarship.applicationDeadline).toLocaleDateString()}

                                                </div>

                                            </div>

                                        </div>

                                        <div className="actionGroup">

                                            <Link to={`/admin/edit-scholarship/${scholarship._id}`} className="btnLink">

                                                <button className="actionBtn edit">

                                                    Edit

                                                </button>

                                            </Link>

                                            <button 
                                                className="actionBtn delete"
                                                onClick={() => deleteScholarship(scholarship._id)}
                                            >

                                                Delete

                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )

                }

            </div>

        </div>

    </>

);

};

export default ManageScholarships;