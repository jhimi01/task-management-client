import { Navigate } from "react-router-dom";
import { useCookie } from "../hooks/useCookie";

const PublicRoute = ({ children }) => {
  const { getCookie } = useCookie({ key: "Token", days: 7 });
  const token = getCookie();

  // If the user is logged in, redirect to the homepage (or another page)
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
