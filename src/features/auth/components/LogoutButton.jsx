import { LogOut } from "lucide-react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { logoutUser } from "../authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const LogoutButton = ({ open }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success(`User logged out successfully`);
      navigate("/login");
    } catch (err) {
      toast.error(`Failed logout`);
      console.log(err);
    }
  };
  return (
    <div>
      <button onClick={handleLogout} className="flex items-center gap-5">
        <LogOut className={`${!open && " text-white "}`} />
        <span className="text-lg text-gray-700">{open && "Logout"}</span>
      </button>
    </div>
  );
};

LogoutButton.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default LogoutButton;
