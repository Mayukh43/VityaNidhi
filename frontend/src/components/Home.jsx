import { Link } from "react-router-dom";

const Home = () => {

    return (

        <>

            <style>{`

                *{
                    margin:0;
                    padding:0;
                    box-sizing:border-box;
                    font-family:Arial, Helvetica, sans-serif;
                }

                body{
                    background:#eef4ff;
                }

                .home{

                    min-height:90vh;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    padding:60px 20px;
                    background:
                    radial-gradient(circle at top left,#dbeafe 0%,transparent 35%),
                    radial-gradient(circle at bottom right,#bfdbfe 0%,transparent 35%),
                    linear-gradient(135deg,#f8fbff,#eef4ff);

                }

                .hero{

                    width:95%;
                    max-width:1200px;
                    background:white;
                    border-radius:30px;
                    padding:60px;
                    box-shadow:0 20px 60px rgba(0,0,0,.08);
                    text-align:center;
                    position:relative;
                    overflow:hidden;

                }

                .hero::before{

                    content:"";
                    position:absolute;
                    width:350px;
                    height:350px;
                    background:#dbeafe;
                    border-radius:50%;
                    top:-170px;
                    right:-120px;
                    opacity:.5;

                }

                .hero::after{

                    content:"";
                    position:absolute;
                    width:250px;
                    height:250px;
                    background:#fde68a;
                    border-radius:50%;
                    bottom:-120px;
                    left:-80px;
                    opacity:.35;

                }

                .badges{

                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:12px;
                    margin-bottom:35px;

                }

                .badge{

                    background:#fff4f2;
                    color:#ea580c;
                    padding:8px 18px;
                    border-radius:50px;
                    font-size:14px;
                    font-weight:600;
                    border:1px solid #fed7aa;

                }

                .title{

                    font-size:60px;
                    font-weight:bold;
                    color:#111827;
                    line-height:1.2;
                    margin-bottom:20px;
                    position:relative;
                    z-index:2;

                }

                .highlight{

                    color:#2563eb;

                }

                .subtitle{

                    max-width:760px;
                    margin:auto;
                    color:#6b7280;
                    font-size:18px;
                    line-height:1.8;
                    margin-bottom:45px;
                    position:relative;
                    z-index:2;

                }
                    .buttons{

    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:25px;
    max-width:900px;
    margin:40px auto 0;
    position:relative;
    z-index:2;

}

.actionBtn{

    text-decoration:none;
    background:white;
    color:#111827;
    border-radius:20px;
    padding:30px;
    transition:.35s;
    border:1px solid #e5e7eb;
    box-shadow:0 12px 30px rgba(0,0,0,.08);

}

.actionBtn:hover{

    transform:translateY(-8px);
    box-shadow:0 25px 45px rgba(37,99,235,.15);

}

.icon{

    width:70px;
    height:70px;
    border-radius:50%;
    background:#2563eb;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:32px;
    margin:auto;
    margin-bottom:20px;

}

.actionBtn h3{

    color:#111827;
    margin-bottom:10px;
    font-size:22px;

}

.actionBtn p{

    color:#6b7280;
    line-height:1.6;

}

                @media(max-width:768px){
                    .buttons{

                    grid-template-columns:1fr;

}

                    .hero{

                        padding:35px 25px;

                    }

                    .title{

                        font-size:38px;

                    }

                    .subtitle{

                        font-size:16px;

                    }

                }

            `}</style>

            <div className="home">

                <div className="hero">

                    <div className="badges">

                        <span className="badge">
                            🎓 Government Scholarships
                        </span>

                        <span className="badge">
                            🤖 AI Powered
                        </span>

                        <span className="badge">
                            📄 Smart Eligibility
                        </span>

                        <span className="badge">
                            ⚡ Instant Recommendation
                        </span>

                    </div>

                    <h1 className="title">

                        Find Your Perfect <br />

                        <span className="highlight">

                            Scholarship

                        </span>

                        {" "}with Artificial Intelligence

                    </h1>

                    <p className="subtitle">

                        Discover Government and Private Scholarships tailored to your academic profile using AI-powered recommendations, smart eligibility matching, instant comparison, and intelligent guidance.

                    </p>

                                        <div className="buttons">

                        <Link
                            className="actionBtn"
                            to="/scholarships"
                        >

                            <div className="icon">

                                🎓

                            </div>

                            <h3>

                                Browse Scholarships

                            </h3>

                            <p>

                                Explore Government & Private Scholarships

                            </p>

                        </Link>

                        <Link
                            className="actionBtn"
                            to="/recommendations"
                        >

                            <div className="icon">

                                🤖

                            </div>

                            <h3>

                                AI Recommendation

                            </h3>

                            <p>

                                Personalized Scholarships using AI

                            </p>

                        </Link>

                        <Link
                            className="actionBtn"
                            to="/chat"
                        >

                            <div className="icon">

                                💬

                            </div>

                            <h3>

                                AI Scholarship Chat

                            </h3>

                            <p>

                                Ask Anything about Scholarships

                            </p>

                        </Link>

                        <Link
                            className="actionBtn"
                            to="/compare"
                        >

                            <div className="icon">

                                ⚖️

                            </div>

                            <h3>

                                Compare Scholarships

                            </h3>

                            <p>

                                Compare Benefits & Eligibility

                            </p>

                        </Link>

                    </div>

                    {/* ---------- Part 3 Starts Here ---------- */}

                </div>

            </div>

        </>

    );

};

export default Home;