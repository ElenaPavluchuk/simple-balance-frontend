import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import DialogModal from "../shared/ui/DialogModal";
import DeleteAlert from "../shared/ui/DeleteAlert";
import { Trash } from "lucide-react";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialogModal, setOpenDialogModal] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.ADMINS.GET_ALL_USERS,
        );

        setUsers(response?.data);
      } catch (err) {
        console.error(err);
        toast.error(
          err.response?.data?.message ||
            "Something went wrong. Please try again",
        );
      }
    };

    getUsers();
  }, []);

  const handleDeleteUser = async () => {
    if (!selectedUserId) return;

    try {
      setIsLoading(true);

      const response = await axiosInstance.delete(
        API_PATHS.ADMINS.DELETE_USER(selectedUserId),
      );

      toast.success(response?.data?.message);
      setUsers(users.filter((user) => user.id !== selectedUserId));
      setOpenDialogModal(false);
      setSelectedUserId(null);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="
            p-6 bg-white rounded-2xl 
            shadow-[0px_10px_30px_rgba(251,111,146,0.12)] 
            overflow-x-auto border border-[#ffe5ec] m-10
        "
    >
      <h2 className="m-4 font-bold">Manage Users page</h2>
      <table className="min-w-full divide-y divide-[#ffb3c6]">
        <thead className="bg-[#ffe5ec] rounded-t-2xl">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-[#e11d48] uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-[#e11d48] uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-[#e11d48] uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-[#e11d48] uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-100">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-[#fff7f8] transition duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                {user.user_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {user.email}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`
                                px-3 py-1 text-xs font-semibold rounded-full 
                                ${
                                  user.user_role === "ADMIN"
                                    ? "bg-[#ffc2d1] text-[#e11d48]"
                                    : "bg-green-100 text-green-600"
                                }
                            `}
                >
                  {user.user_role}
                </span>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setOpenDialogModal(true);
                  }}
                  className={`
                                    p-2 rounded-full 
                                    transition duration-200
                                    ${
                                      user.user_role === "ADMIN"
                                        ? "text-gray-400 cursor-not-allowed"
                                        : "text-gray-400 bg-white hover:bg-white hover:text-red-500"
                                    }
                                `}
                  disabled={user.user_role === "ADMIN"}
                  title={
                    user.user_role === "ADMIN"
                      ? "Cant remove administrator"
                      : "Delete user"
                  }
                >
                  <Trash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DialogModal
        isOpen={openDialogModal}
        onClose={() => setOpenDialogModal(false)}
        title="Delete user"
      >
        <DeleteAlert
          content="Are you sure you want to delete the user?"
          onDelete={handleDeleteUser}
          onClose={() => setOpenDialogModal(false)}
          isLoading={isLoading}
        />
      </DialogModal>

      <div>
        <Toaster position="top-center" />
      </div>
    </div>
  );
}
