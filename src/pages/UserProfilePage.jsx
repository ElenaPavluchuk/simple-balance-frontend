import { useState } from "react";
import { useAuth } from "../shared/context/auth/useAuth";
import UserProfileCard from "../shared/ui/UserProfile/UserProfileCard";
import EditUserProfileForm from "../shared/ui/UserProfile/EditUserProfileForm";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";

export default function UserProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  console.log("user: ", user);

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
        // если картинка не менялась
        // const data = {
        //   fullName: data.fullName,
        //   ...(data.currentPassword && {
        //     currentPassword: data.currentPassword,
        //     newPassword: data.newPassword,
        //   }),
        // };

        response = await axiosInstance.put(API_PATHS.USERS.USER_PROFILE, data);
        console.log("data from profile page: ", data);
      }

      // const response = await axiosInstance.put(
      //   API_PATHS.USERS.USER_PROFILE,
      //   data,
      // );

      updateUser(response?.data?.updatedUser);
      setIsEdit(false);
    } catch (err) {
      console.error(err);
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again";
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => setIsEdit(false);
  return (
    <div className="m-10 flex flex-col items-center w-fit gap-5">
      <h2 className="font-bold">UserProfilePage</h2>
      {apiError && (
        <p className="text-red-500 italic text-center">{apiError}</p>
      )}

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
