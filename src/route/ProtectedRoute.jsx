import { Navigate } from "react-router-dom";
import { useCookie } from "../hooks/useCookie";

const ProtectedRoute = ({ children }) => {
  const { getCookie } = useCookie({ key: "Token", days: 7 });
  const token = getCookie();

  // If there's no token, redirect to the login page
  if (token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
