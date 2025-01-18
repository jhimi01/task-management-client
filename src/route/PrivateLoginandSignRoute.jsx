import { Navigate, useLocation } from "react-router";
import { useCookie } from "../hooks/useCookie";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { Loader } from "lucide-react";
import PropTypes from "prop-types";


const PrivateLoginandSignRoute = ({children}) => {
    const { user, loading } = useLoggedInUser();
    const { getCookie } = useCookie({ key: "Token", days: 7 });
    const token = getCookie();
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
          {/* <progress className="progress w-3/4"></progress> */}
          <div className="flex items-center gap-2">Loading... <Loader className="animate-spin" /></div>
        </div>
      );
    }
  
    if (!user && !token) {
      return children;
    }
  
    return <Navigate to="/" state={{ from: location }} replace />;
  };
  
  PrivateLoginandSignRoute.propTypes = {
    children: PropTypes.func.isRequired,
}

export default PrivateLoginandSignRoute
