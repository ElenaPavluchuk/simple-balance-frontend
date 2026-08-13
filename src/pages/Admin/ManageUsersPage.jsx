import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../shared/utils/axiosInstance";
import { API_PATHS } from "../../shared/utils/apiPaths";
import DialogModal from "../../shared/ui/DialogModal";
import DeleteAlert from "../../shared/ui/DeleteAlert";
import { Trash } from "lucide-react";
import { getErrorMessage } from "../../shared/utils/getErrorMessage";
import Loader from "../../shared/ui/Loader";
import Button from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDeleteUserLoading, setIsDeleteUserLoading] = useState(false);
  const [openDialogModal, setOpenDialogModal] = useState(false);
  const [isUsersLoading, setIsUsersLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const getUsers = async () => {
      setIsUsersLoading(true);

      try {
        const response = await axiosInstance.get(
          API_PATHS.ADMINS.GET_ALL_USERS,
        );

        if (isCancelled) return;

        setUsers(response.data ?? []);
      } catch (err) {
        if (isCancelled) return;
        console.error(err);
        toast.error(getErrorMessage(err));
      } finally {
        setIsUsersLoading(false);
      }
    };

    getUsers();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleDeleteUser = async () => {
    if (!selectedUserId) return;

    setIsDeleteUserLoading(true);

    try {
      const response = await axiosInstance.delete(
        API_PATHS.ADMINS.DELETE_USER(selectedUserId),
      );

      toast.success(response.data?.message);
      setUsers(users.filter((user) => user?.id !== selectedUserId));
      setOpenDialogModal(false);
      setSelectedUserId(null);
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setIsDeleteUserLoading(false);
    }
  };

  if (isUsersLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <h2 className="text-3xl text-emerald-800">Manage users</h2>
      <p className="text-xs md:text-sm text-cyan-900 mt-1 mb-6 text-balance">
        Administration tool for viewing and removing user accounts
      </p>

      {/* mobile cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users.map((user) => (
          <Card key={user?.id} className="flex flex-row justify-between gap-5">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-cyan-900 inline-block w-12">
                  Name
                </span>
                <span className="text-base font-semibold text-slate-900">
                  {user?.user_name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-cyan-900 inline-block w-12">
                  Email
                </span>
                <span className="whitespace-nowrap text-base text-cyan-950">
                  {user?.email}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-cyan-900 inline-block w-12">
                  Role
                </span>
                <span
                  className={`inline-block w-22 px-3 py-1 text-xs text-center font-semibold rounded-full ${user?.user_role === "ADMIN" ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"}`}
                >
                  {user?.user_role}
                </span>
              </div>
            </div>

            <span
              title={
                user?.user_role === "ADMIN"
                  ? "Administrators cannot be removed"
                  : "Delete user"
              }
              className={`w-8 h-8 border rounded-full flex items-center justify-center ${user?.user_role === "ADMIN" ? "border-gray-300 text-gray-400" : "border-emerald-800 text-emerald-800"}`}
            >
              <Button
                variant="icon"
                onClick={() => {
                  setSelectedUserId(user?.id);
                  setOpenDialogModal(true);
                }}
                disabled={user?.user_role === "ADMIN"}
              >
                <Trash size={18} />
              </Button>
            </span>
          </Card>
        ))}
      </div>

      {/* table */}
      <Card className="hidden md:block">
        <table className="min-w-full divide-y divide-emerald-600">
          <thead className="">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-emerald-800 uppercase">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-emerald-800 uppercase">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-emerald-800 uppercase">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-emerald-800 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr
                key={user?.id}
                className="hover:bg-gray-100/50 transition duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                  {user?.user_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-950">
                  {user?.email}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-block w-22 px-3 py-1 text-xs text-center font-semibold rounded-full ${user?.user_role === "ADMIN" ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"}`}
                  >
                    {user?.user_role}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span
                    title={
                      user?.user_role === "ADMIN"
                        ? "Administrators cannot be removed"
                        : "Delete user"
                    }
                    className={`flex justify-center max-w-7 ${user?.user_role === "ADMIN" ? "text-gray-400 cursor-not-allowed" : "text-emerald-700 hover:text-emerald-500"}`}
                  >
                    <Button
                      variant="icon"
                      onClick={() => {
                        setSelectedUserId(user?.id);
                        setOpenDialogModal(true);
                      }}
                      disabled={user?.user_role === "ADMIN"}
                    >
                      <Trash size={18} />
                    </Button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <DialogModal
        isOpen={openDialogModal}
        onClose={() => setOpenDialogModal(false)}
        title="Delete user"
      >
        <DeleteAlert
          message="Are you sure you want to delete the user?"
          onDelete={handleDeleteUser}
          onClose={() => setOpenDialogModal(false)}
          isLoading={isDeleteUserLoading}
        />
      </DialogModal>
    </>
  );
}
