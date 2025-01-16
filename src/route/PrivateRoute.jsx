import { Navigate, useLocation } from "react-router-dom";
import useLoggedInUser from "../hooks/useLoggedInUser";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useLoggedInUser()
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "55vh",
        }}
      >
        <progress className="progress w-3/4"></progress>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PrivateRoute;

// export default PrivateRoute
