import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || (allowedRole && currentUser.role !== allowedRole)) {
    return <Navigate to="/register" />;
  }
  return children;
};

export default ProtectedRoute;