const AnalyticsCard = ({

    title,

    value,

    color

}) => {

    return (

        <div
            style={{
                background: color,
                color: "white",
                padding: "20px",
                borderRadius: "12px",
                width: "220px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
            }}
        >

            <h3>{title}</h3>

            <h1>{value}</h1>

        </div>

    );

};

export default AnalyticsCard;