const Footer = () => {

    return (

        <>
<style>{`

    .footer{

        width:100%;
        background:linear-gradient(
            135deg,
            #EAF3FF 0%,
            #DCEEFF 100%
        );
        color:#1E3A8A;
        text-align:center;
        padding:25px 10px;
        margin-top:50px;
        border-top:1px solid #C7D8F5;

    }

    .footer hr{

        border:none;
        height:1px;
        background:#C7D8F5;
        margin-bottom:18px;

    }

    .footer p{

        font-size:15px;
        letter-spacing:.5px;
        font-weight:500;

    }

`}</style>

            <footer className="footer">

                <hr />

                <p>

                    © 2026 Scholarship Recommendation System. All Rights Reserved.

                </p>

            </footer>

        </>

    );

};

export default Footer;