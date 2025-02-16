import { Navigate, useLocation } from "react-router";
import { useCookie } from "../hooks/useCookie";
// import useLoggedInUser from "../hooks/useLoggedInUser";
import { Loader } from "lucide-react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserData } from "../features/auth/authSlice";

const PrivateLoginandSignRoute = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  const { isLoading, user } = useSelector((state) => state.auth);
  const { getCookie } = useCookie({ key: "Token", days: 7 });
  const token = getCookie();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "55vh",
        }}
      >
        <div className="flex items-center gap-2">
          Loading... <Loader className="animate-spin" />
        </div>
      </div>
    );
  }

  if (user && token) {
    // If user is logged in, redirect to home page
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If user is not logged in, allow access to login/signup page
  return children;
};

PrivateLoginandSignRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateLoginandSignRoute;
