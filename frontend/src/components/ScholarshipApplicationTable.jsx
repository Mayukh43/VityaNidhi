const ScholarshipApplicationTable = ({ data }) => {

    return (

        <div
            style={{
                marginTop: "30px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                overflow: "hidden"
            }}
        >

            <h2
                style={{
                    padding: "15px",
                    background: "#1976d2",
                    color: "white",
                    margin: 0
                }}
            >
                Applications Per Scholarship
            </h2>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >

                <thead>

                    <tr
                        style={{
                            background: "#f5f5f5"
                        }}
                    >

                        <th
                            style={{
                                padding: "12px",
                                border: "1px solid #ddd"
                            }}
                        >
                            Scholarship Name
                        </th>

                        <th
                            style={{
                                padding: "12px",
                                border: "1px solid #ddd"
                            }}
                        >
                            Total Applications
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        data.length > 0 ? (

                            data.map((item, index) => (

                                <tr key={index}>

                                    <td
                                        style={{
                                            padding: "12px",
                                            border: "1px solid #ddd"
                                        }}
                                    >
                                        {item.scholarshipName}
                                    </td>

                                    <td
                                        style={{
                                            padding: "12px",
                                            border: "1px solid #ddd",
                                            textAlign: "center"
                                        }}
                                    >
                                        {item.applications}
                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="2"
                                    style={{
                                        padding: "20px",
                                        textAlign: "center"
                                    }}
                                >
                                    No applications found.
                                </td>

                            </tr>

                        )

                    }

                </tbody>

            </table>

        </div>

    );

};

export default ScholarshipApplicationTable;