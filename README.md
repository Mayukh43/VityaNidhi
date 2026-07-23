# VityaNidhi
# 🎓 VityaNidhi - AI-Powered Scholarship Portal

> **Empowering Students to Discover, Verify, and Secure Scholarships Effortlessly.**

VityaNidhi is a comprehensive MERN stack platform designed to streamline the scholarship application and management process. By integrating modern AI capabilities, VityaNidhi helps students discover matching scholarships, verify eligibility automatically, compare options, and interact with an intelligent chatbot for quick guidance.

---

## ✨ Features

### 👨‍🎓 Student Module
- 🔑 **Authentication & Profile Management:** Secure JWT-based registration, login, and detailed profile setup.
- 🔍 **Scholarship Search & Filtering:** Browse, filter, and view detailed criteria for government and private scholarships.
- 📝 **Application Tracking:** Apply directly and monitor real-time application status.
- 🤖 **AI Scholarship Recommendation:** Smart recommendations based on student profile, qualification, and financial status.
- ✅ **AI Eligibility Verification:** Automated checks generating an AI-powered eligibility report.
- 💬 **AI Scholarship Chatbot:** Interactive assistant to answer scholarship-related queries.
- 📊 **AI Scholarship Comparison:** Side-by-side comparative analysis of multiple scholarships.

### 🛠️ Admin Module
- 📂 **Scholarship Management:** Add, edit, update, and delete scholarship listings.
- 📋 **Application Processing:** Review, approve, reject, or mark student applications under review.
- 📈 **Analytics Dashboard:** Visual Insights on total students, applications, approval rates, and scholarship breakdown.

---

## 🤖 AI Features Powered by Groq API

- **AI Recommendation Engine:** Matches students to relevant schemes using academic and income parameters.
- **Automated Eligibility Report:** Evaluates criteria like percentage, age, caste, and income limits to determine candidate fit.
- **Interactive Chatbot:** Instant responses to queries regarding required documents, deadlines, and eligibility criteria.
- **Comparative Analysis:** Detailed structural comparison of funding amounts, benefits, and requirements across different providers.

---

## 🛠️ Tech Stack

### 🎨 Frontend
- **Framework:** React.js
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Styling:** CSS3 / Tailwind CSS

### ⚙️ Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt.js
- **File Uploads:** Multer

### 🗄️ Database & AI Integration
- **Database:** MongoDB & Mongoose
- **Database Management:** MongoDB Compass
- **AI Integration:** Groq API *(Llama 3.3 70B Versatile)*

---

## 📁 Project Structure

```text
VityaNidhi/
│
├── backend/
│   ├── config/          # Database configuration (db.js)
│   ├── controllers/     # Route logic & controllers
│   ├── middleware/      # JWT Authentication & Middleware
│   ├── models/          # Mongoose Schemas (Student, Admin, Scholarship, etc.)
│   ├── routes/          # Express route definitions
│   ├── services/        # AI & External integrations
│   ├── uploads/         # Subdirectories with .gitkeep for student uploads
│   ├── utils/           # Helper utility functions
│   ├── .env             # Environment variables (Ignored)
│   ├── package.json
│   └── server.js        # Entry point for backend server
│
└── frontend/
    ├── public/          # Public assets
    ├── src/
    │   ├── assets/      # Images & static media
    │   ├── components/  # React components (Dashboards, AI Tools, Cards, Forms)
    │   ├── App.jsx      # Main application router
    │   └── main.jsx     # React DOM renderer
    ├── package.json
    └── vite.config.js
