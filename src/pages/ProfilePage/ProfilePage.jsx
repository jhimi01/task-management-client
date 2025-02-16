import { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import EditProfileModal from "../../components/EditProfileModal";
import ImageUpload from "../../components/ImageUpload";
import ResetPasswordModal from "../../components/ResetPasswordModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../features/auth/authSlice";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [resetPassword, setResetPassword] = useState({});

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleEditClick = (userData) => {
    setIsModalOpen(true);
    setSelectedUser(userData);
  };

  const handleResetPasswordClick = (data) => {
    setResetPassword(data);
    setIsResetPasswordModalOpen(true);
  };

  const handleImageChange = (newImageUrl) => {
    // refetch();
    console.log("Image URL received from child:", newImageUrl);
  };


  return (
    <div>
      <div className="">
        <div className="">
          {/* top Section */}
          <div className="mb-3 p-4 bg-white mx-auto text-center">
            <div className="group mx-auto relative w-40 mb-3 md:mb-5">
              <img
                src={
                  user?.userData?.img ||
                  "https://t3.ftcdn.net/jpg/03/64/62/36/360_F_364623623_ERzQYfO4HHHyawYkJ16tREsizLyvcaeg.jpg"
                }
                className="md:w-40 md:h-40 w-20 h-20 object-cover mx-auto rounded-full duration-300 group-hover:border-blue-400 border-gray-400 border-2 group-hover:scale-105 transition group-hover:border-4"
                alt="user pic"
              />
              <div className="absolute md:bottom-5 bottom-1 md:right-2 right-9 cursor-pointer bg-white group-hover:block hidden">
                <ImageUpload onChange={handleImageChange} />
              </div>
            </div>
            <div className="text-slate-800">
              <h1 className="text-xl mb-1 font-semibold capitalize">
                {user?.userData?.name}
              </h1>
            </div>
            <p className="text-sm pb-3 text-slate-700">{user?.userData?.bio}</p>
          </div>
          <hr />

          {/* bottom Section */}
          <div className="p-4 text-sm md:text-base bg-white mx-auto">
            <table className="min-w-full table-auto">
              <tbody>
                {[
                  ["Name:", user?.userData?.name],
                  ["Email:", user?.userData?.email],
                  ["UserName:", user?.userData?.userName],
                  [
                    "Joined:",
                    new Date(user?.userData?.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        // hour: "numeric",
                        // minute: "numeric",
                        // second: "numeric",
                      }
                    ),
                  ],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b">
                    <td className="p-2 font-semibold">{label}</td>
                    <td className="p-2 ">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              className="text-sm text-blue-800 underline cursor-pointer my-4"
              onClick={() => handleResetPasswordClick(user?.userData)}
            >
              Change Password
            </div>
            <div className="mt-4">
              <button
                onClick={() => handleEditClick(user?.userData)}
                className="bg-primary flex text-white px-4 gap-2 text-lg items-center py-2"
              >
                Edit <Edit />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {user?.userData && (
        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedUser={selectedUser}
        />
      )}

      <ResetPasswordModal
        isOpen={isResetPasswordModalOpen}
        onClose={() => setIsResetPasswordModalOpen(false)}
        resetPassworddata={resetPassword}
        // onSave={handleResetPasswordSave}
      />
    </div>
  );
};

export default ProfilePage;
