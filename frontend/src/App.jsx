import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Register from "./components/Register";
import AdminRegister from "./components/AdminRegister";
import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import Scholarships from "./components/Scholarships";
import ScholarshipDetails from "./components/ScholarshipDetails";
import MyApplications from "./components/MyApplications";
import AddScholarship from "./components/AddScholarship";
import ManageScholarships from "./components/ManageScholarships";
import EditScholarship from "./components/EditScholarship";
import AdminApplications from "./components/AdminApplications";
import ApplicationDetails from "./components/ApplicationDetails";
import AIRecommendations from "./components/AIRecommendation";
import AIChat from "./components/AIChat";
import AIComparison from "./components/AIComparison";
import AdminAnalytics from "./components/AdminAnalytics";



const App = () => {
  return(
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/admin-register" element={<AdminRegister />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route path = "/dashboard" element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard/>
          </ProtectedRoute>
         }
         />
         <Route path = "/admin-dashboard" element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard/>
          </ProtectedRoute>
         }
         />

         <Route path = "/profile" element={
          <ProtectedRoute allowedRole="student">
            <Profile/>
          </ProtectedRoute>
         }
         />

         <Route path = "/scholarships" element={
          <ProtectedRoute allowedRole="student">
            <Scholarships/>
          </ProtectedRoute>
         }
         />

         <Route path = "/scholarships/:id" element={
          <ProtectedRoute allowedRole="student">
            <ScholarshipDetails/>
          </ProtectedRoute>
         }
         />

         <Route path = "/applications" element={
          <ProtectedRoute allowedRole="student">
            <MyApplications/>
          </ProtectedRoute>
         }
         />

         <Route path = "/admin/add-scholarship" element={
          <ProtectedRoute allowedRole="admin">
            <AddScholarship/>
          </ProtectedRoute>
         }
         />

         <Route path = "/admin/scholarships" element={
          <ProtectedRoute allowedRole="admin">
            <ManageScholarships/>
          </ProtectedRoute>
         }
         />

         <Route path = "/admin/edit-scholarship/:id" element={
          <ProtectedRoute allowedRole="admin">
            <EditScholarship/>
          </ProtectedRoute>
         }
         />

         <Route path = "/admin/applications" element={
          <ProtectedRoute allowedRole="admin">
            <AdminApplications/>
          </ProtectedRoute>
         }
         />

         <Route path = "/admin/applications/:id" element={
          <ProtectedRoute allowedRole="admin">
            <ApplicationDetails/>
          </ProtectedRoute>
         }
         />

         <Route path = "/recommendations" element={
          <ProtectedRoute allowedRole="student">
            <AIRecommendations/>
          </ProtectedRoute>
         }
         />

         <Route path = "/chat" element={
          <ProtectedRoute allowedRole="student">
            <AIChat/>
          </ProtectedRoute>
         }
         />

         <Route path = "/compare" element={
          <ProtectedRoute allowedRole="student">
            <AIComparison/>
          </ProtectedRoute>
         }
         />

         <Route path = "/admin/analytics" element={
          <ProtectedRoute allowedRole="admin">
            <AdminAnalytics/>
          </ProtectedRoute>
         }
         />


        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;