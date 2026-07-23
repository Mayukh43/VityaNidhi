const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/scholarships", require("./routes/scholarshipRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));


const PORT = process.env.PORT || 5200;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});