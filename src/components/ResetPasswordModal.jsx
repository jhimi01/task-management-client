import { useState } from "react";
import PropTypes from "prop-types";
import { Eye, EyeClosed } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const ResetPasswordModal = ({ isOpen, onClose, resetPassworddata }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth); // Adjust according to your state structure

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPass, setNewPass] = useState(true);
  const [showPass, setShowPass] = useState(true);
  const [localError, setLocalError] = useState("");

  const handleSave = () => {
    setLocalError("");

    if (newPassword.length < 6) {
      setLocalError("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setLocalError("New password and confirmation do not match");
      return;
    }

    const email = resetPassworddata.email;

    dispatch(resetPassword({ email, oldPassword, newPassword }))
      .unwrap()
      .then(() => {
        toast.success("Password reset successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onClose();
      })
      .catch((err) => {
        setLocalError(err.message || "Failed to reset password");
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100000] flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96 space-y-3">
        <h2 className="text-xl font-semibold">Reset Password</h2>

        {localError && <p className="text-red-500 text-sm">{localError}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label htmlFor="oldPassword" className="block">
            Old Password
          </label>
          <input
            id="oldPassword"
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="relative">
          <label htmlFor="newPassword" className="block">
            New Password
          </label>
          <input
            id="newPassword"
            type={showPass ? "password" : "text"}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute top-10 right-2"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <EyeClosed /> : <Eye />}
          </button>
        </div>

        <div className="relative">
          <label htmlFor="confirmPassword" className="block">
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type={newPass ? "password" : "text"}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute top-10 right-2"
            onClick={() => setNewPass(!newPass)}
          >
            {newPass ? <EyeClosed /> : <Eye />}
          </button>
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

ResetPasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  resetPassworddata: PropTypes.object.isRequired,
};

export default ResetPasswordModal;
