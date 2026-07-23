import { useState } from "react";
import axios from "axios";

const AIChat = () => {

    const [message, setMessage] = useState("");

    const [response, setResponse] = useState("");

    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    const askAI = async () => {

        if (!message.trim()) {

            alert("Please enter your question.");

            return;

        }

        try {

            setLoading(true);

            const res = await axios.post(

                "http://localhost:5200/api/ai/chat",

                {

                    message

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setResponse(res.data.response);

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to contact AI."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div style={{ padding: "30px" }} className="aiChatContainer">

            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: Arial, Helvetica, sans-serif;
                }

                .aiChatContainer {
                    min-height: 90vh;
                    background: linear-gradient(135deg, #F8FAFC, #EAF3FF, #DCEEFF);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .aiChatContainer > h1 {
                    color: #0F172A;
                    font-size: 28px;
                    font-weight: 800;
                    width: 100%;
                    max-width: 850px;
                }

                .aiChatContainer > hr {
                    width: 100%;
                    max-width: 850px;
                    border: none;
                    height: 3px;
                    background: linear-gradient(90deg, #2563EB, transparent);
                    margin: 12px 0 24px 0;
                }

                .aiChatContainer > textarea {
                    width: 100%;
                    max-width: 850px;
                    padding: 16px;
                    border-radius: 14px;
                    border: 1px solid #CBD5E1;
                    background: #FFFFFF;
                    font-size: 15px;
                    color: #0F172A;
                    outline: none;
                    resize: vertical;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }

                .aiChatContainer > textarea:focus {
                    border-color: #2563EB;
                    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
                }

                .aiChatContainer > button {
                    padding: 12px 32px;
                    background: #2563EB;
                    color: #FFFFFF;
                    border: none;
                    border-radius: 10px;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
                }

                .aiChatContainer > button:hover:not(:disabled) {
                    background: #1D4ED8;
                    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.35);
                    transform: translateY(-2px);
                }

                .aiChatContainer > button:disabled {
                    background: #94A3B8;
                    cursor: not-allowed;
                    box-shadow: none;
                }

                .aiChatContainer > h2 {
                    color: #1E293B;
                    font-size: 20px;
                    font-weight: 700;
                    width: 100%;
                    max-width: 850px;
                    margin-top: 10px;
                    margin-bottom: 12px;
                }

                /* Response Container Styling */
                .aiChatContainer > div {
                    width: 100%;
                    max-width: 850px;
                    border: 1px solid rgba(219, 234, 254, 0.8) !important;
                    background: rgba(255, 255, 255, 0.75) !important;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border-radius: 16px !important;
                    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.06);
                }

                .aiChatContainer pre {
                    color: #334155;
                    font-size: 15px;
                    line-height: 1.6;
                }
            `}</style>

            <h1>AI Scholarship Chatbot</h1>

            <hr />

            <textarea

                rows="5"

                cols="70"

                placeholder="Ask anything about scholarships..."

                value={message}

                onChange={(e) => setMessage(e.target.value)}

            />

            <br /><br />

            <button

                onClick={askAI}

                disabled={loading}

            >

                {

                    loading

                    ?

                    "Thinking..."

                    :

                    "Ask AI"

                }

            </button>

            <hr />

            <h2>AI Response</h2>

            <div

                style={{

                    border: "1px solid gray",

                    padding: "20px",

                    borderRadius: "8px",

                    background: "#f8f8f8"

                }}

            >

                <pre

                    style={{

                        whiteSpace: "pre-wrap",

                        fontFamily: "inherit"

                    }}

                >

                    {response || "Ask a question to see the AI response."}

                </pre>

            </div>

        </div>

    );

};

export default AIChat;