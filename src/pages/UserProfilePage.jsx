import { useState } from "react";
import { useAuth } from "../shared/context/auth/useAuth";
import UserProfileCard from "../shared/ui/UserProfile/UserProfileCard";
import EditUserProfileForm from "../shared/ui/UserProfile/EditUserProfileForm";
import DeleteUserProfileCard from "../shared/ui/UserProfile/DeleteUserProfileCard";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import toast from "react-hot-toast";
import { getErrorMessage } from "../shared/utils/getErrorMessage";
import Loader from "../shared/ui/Loader";

export default function UserProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleEdit = () => setIsEdit(true);

  const handleSaveEdit = async (data) => {
    setIsUpdateLoading(true);

    try {
      let response;

      const isFile = data.profileImage instanceof File;

      if (isFile) {
        const formData = new FormData();

        formData.append("userName", data.userName);
        formData.append("profileImage", data.profileImage);

        if (data.currentPassword) {
          formData.append("currentPassword", data.currentPassword);
          formData.append("newPassword", data.newPassword);
        }

        response = await axiosInstance.put(
          API_PATHS.USERS.USER_PROFILE,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      } else {
        response = await axiosInstance.put(API_PATHS.USERS.USER_PROFILE, data);
      }

      updateUser(response.data?.updatedUser);
      setIsEdit(false);
      toast.success(response.data?.message);
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setIsUpdateLoading(false);
    }
  };

  const handleCancelEdit = () => setIsEdit(false);

  const handleDelete = async () => {
    setIsDeleteLoading(true);

    try {
      const response = await axiosInstance.delete(API_PATHS.USERS.USER_PROFILE);
      toast.success(response.data?.message);

      logout();
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setIsDeleteLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-3xl text-emerald-800">Profile Info</h2>

      {isEdit ? (
        <>
          <EditUserProfileForm
            user={user}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
            isUpdateLoading={isUpdateLoading}
          />

          <DeleteUserProfileCard
            onDeleteUser={handleDelete}
            isDeleteLoading={isDeleteLoading}
          />
        </>
      ) : (
        <UserProfileCard user={user} onEdit={handleEdit} />
      )}
    </div>
  );
}
