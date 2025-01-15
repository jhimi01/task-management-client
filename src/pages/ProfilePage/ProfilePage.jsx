import { useState } from "react";
import { Edit } from "lucide-react";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import EditProfileModal from "../../components/EditProfileModal";
import { format } from "date-fns"; // Import the format function from date-fns

const ProfilePage = () => {
  const { user, loading, error, refetch } = useLoggedInUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("thisid user", user);

  // const userInfo = user.userData;
  // console.log("user info", user.userData);

  const handleEditClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleSave = (updatedData) => {
    refetch();
    console.log("Saved data:", updatedData);
    // You can save the updated data to the backend here
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log();

  return (
    <div className="bg-gray-200">
      <div className="wrapper">
        <div className="mt-10 p-4">
          <div className="flex gap-4">
            {/* 1st section */}
            <div className="w-[30%] space-y-3 p-4 bg-white mx-auto text-center">
              <div className="group mx-auto relative w-40">
                <img
                  src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                  className="w-40 h-40 mx-auto rounded-full group-hover:border-red-400 group-hover:scale-105 transition group-hover:border-4"
                  alt="user pic"
                />
                <Edit className="absolute bottom-5 right-2 cursor-pointer bg-white group-hover:block hidden" />
              </div>
              <div className="text-slate-800">
                <h1 className="text-xl font-semibold capitalize">
                  {user.userData?.firstName} {user.userData?.lastName}
                </h1>
                <p>{user.userData?.title}</p>
                <p className="text-xs">{user.userData?.address}</p>
              </div>
              <hr />
              <p className="text-sm font-semibold text-slate-700">
                {user.userData?.email}
              </p>
            </div>

            <div className="w-[80%] p-4 bg-white mx-auto">
              {/* Table to display user data */}
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="text-left p-2"></th>
                    <th className="text-left p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 font-semibold">Mobile Number:</td>
                    <td className="p-2">{user.userData?.mobileNumber}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-semibold">Date of Birth:</td>
                    <td className="p-2">
                      {format(
                        new Date(user.userData?.dateOfBirth),
                        "MMMM dd, yyyy"
                      )}{" "}
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-semibold">Gender:</td>
                    <td className="p-2">{user.userData?.gender}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-semibold">NID:</td>
                    <td className="p-2">{user.userData?.nid}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-semibold">Created Account:</td>
                    <td className="p-2">
                      {format(
                        new Date(user.userData?.createdAt),
                        "MMMM dd, yyyy"
                      )}
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-semibold">Name:</td>
                    <td className="p-2">
                      {user.userData?.firstName} {user.userData?.lastName}
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 font-semibold">Country:</td>
                    <td className="p-2">{user.userData?.country}</td>
                  </tr>
                </tbody>
              </table>

              <div className="text-sm text-blue-800 underline cursor-pointer my-4">
                Reset Password
              </div>
              <div className="mt-4">
                <button
                  onClick={handleEditClick}
                  className="bg-primary flex text-white px-4 gap-2 text-lg items-center py-2"
                >
                  Edit <Edit />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={user.userData}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProfilePage;
