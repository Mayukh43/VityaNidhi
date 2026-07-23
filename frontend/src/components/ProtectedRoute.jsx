import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // User not logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Wrong role
    if (allowedRole && role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
