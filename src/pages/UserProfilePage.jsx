import { useState } from "react";
import { useAuth } from "../shared/context/auth/useAuth";
import UserProfileCard from "../shared/ui/UserProfile/UserProfileCard";
import EditUserProfileForm from "../shared/ui/UserProfile/EditUserProfileForm";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import toast, { Toaster } from "react-hot-toast";

export default function UserProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => setIsEdit(true);

  const handleSaveEdit = async (data) => {
    setIsLoading(true);

    try {
      let response;

      const isFile = data.profileImage instanceof File;

      if (isFile) {
        const formData = new FormData();

        formData.append("fullName", data.fullName);
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

      updateUser(response?.data?.updatedUser);
      setIsEdit(false);
      toast.success(response?.data?.message);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => setIsEdit(false);
  return (
    <div className="m-10 flex flex-col items-center w-fit gap-5">
      <h2 className="font-bold">UserProfilePage</h2>

      <div>
        <Toaster position="top-center" />
      </div>

      {isEdit ? (
        <EditUserProfileForm
          user={user}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          isLoading={isLoading}
        />
      ) : (
        <UserProfileCard user={user} onEdit={handleEdit} />
      )}
    </div>
  );
}
