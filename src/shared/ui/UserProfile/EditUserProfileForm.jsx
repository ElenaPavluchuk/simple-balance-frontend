import { useState } from "react";
import { authValidate, clearFieldError } from "../../utils/validate";
import ImageSelector from "./ImageSelector";
import Input from "../Input";
import Button from "../Button";

export default function EditUserProfileForm({
  user,
  onSave,
  onCancel,
  isLoading,
}) {
  const [newProfileImage, setNewProfileImage] = useState(
    user?.profile_image_url || null,
  );
  const [isRemoveImage, setIsRemoveImage] = useState(false);
  const [newUserName, setNewUserName] = useState(user.user_name);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validateErrors, setValidateErrors] = useState({});
  const isImageChanged = newProfileImage !== user?.profile_image_url;

  const handleUserNameChange = (e) => {
    setNewUserName(e);
    clearFieldError("userName", setValidateErrors);
  };

  const handleCurrentPasswordChange = (e) => setCurrentPassword(e);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e);
    clearFieldError("password", setValidateErrors);
  };

  const toggleEditPassword = () => {
    setIsEditPassword((prev) => !prev);

    if (isEditPassword) {
      setCurrentPassword("");
      setNewPassword("");
      clearFieldError("password", setValidateErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validatePayload = { userName: newUserName };

    if (isEditPassword) {
      validatePayload.password = newPassword;
    }

    const errors = authValidate(validatePayload);

    setValidateErrors(errors);
    if (Object.keys(errors).length) return;

    const data = {
      userName: newUserName.trim(),
      ...(isRemoveImage && { removeProfileImage: true }),
      ...(isImageChanged &&
        newProfileImage instanceof File && {
          profileImage: newProfileImage,
        }),
      ...(isEditPassword && {
        currentPassword,
        newPassword,
      }),
    };

    onSave(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center bg-white md:p-6 p-4 shadow-md rounded-3xl w-full max-w-md"
    >
      <ImageSelector
        image={newProfileImage}
        setImage={setNewProfileImage}
        onRemoveImage={setIsRemoveImage}
      />

      <div className="flex flex-col gap-3 w-full my-9">
        <Input
          value={newUserName}
          onChange={handleUserNameChange}
          label="Change name"
        />
        {validateErrors.userName && (
          <p className="text-red-500 italic">{validateErrors.userName}</p>
        )}

        <Button onClick={toggleEditPassword} variant="secondary">
          {isEditPassword ? "Cancel" : "Change password"}
        </Button>

        {isEditPassword && (
          <div className="flex flex-col gap-2">
            <Input
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              label="Current password"
              type="password"
            />
            <Input
              value={newPassword}
              onChange={handleNewPasswordChange}
              label="New password"
              type="password"
            />
            {validateErrors.password && (
              <p className="text-red-500 italic">{validateErrors.password}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex md:flex-row md:justify-around flex-col gap-3 w-full">
        <Button
          type="submit"
          disabled={isLoading}
          variant="primary"
          className="md:w-1/3"
        >
          {isLoading ? "Updating..." : "Update profile"}
        </Button>
        <Button
          onClick={onCancel}
          variant="secondary"
          className="h-full md:w-1/3"
        >
          Cancel edit
        </Button>
      </div>
    </form>
  );
}
