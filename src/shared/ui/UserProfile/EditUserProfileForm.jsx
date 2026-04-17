import { useState } from "react";
import { authValidate, clearFieldError } from "../../utils/validate";
import ImageSelector from "./ImageSelector";

export default function EditUserProfileForm({
  user,
  onSave,
  onCancel,
  isLoading,
}) {
  const [newProfileImage, setNewProfileImage] = useState(
    user.profile_image_url || null,
  );
  const isImageChanged = newProfileImage !== user.profile_image_url;
  const [isRemoveImage, setIsRemoveImage] = useState(false);
  const [newFullName, setNewFullName] = useState(user.full_name);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validateErrors, setValidateErrors] = useState({});

  const togglePasswordEdit = () => {
    setIsEditPassword((prev) => !prev);

    if (isEditPassword) {
      setCurrentPassword("");
      setNewPassword("");
      clearFieldError("password", setValidateErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validatePayload = { fullName: newFullName };
    if (isEditPassword) {
      validatePayload.password = newPassword;
    }

    const errors = authValidate(validatePayload);

    setValidateErrors(errors);
    if (Object.keys(errors).length) return;

    const data = {
      fullName: newFullName.trim(),
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
      className="flex flex-col gap-3 bg-white p-4 shadow-md rounded w-md"
    >
      <h3 className="font-semibold text-center">Edit Profile</h3>
      <ImageSelector
        image={newProfileImage}
        setImage={setNewProfileImage}
        onRemoveImage={setIsRemoveImage}
      />
      <label>
        Full name:{" "}
        <input
          value={newFullName}
          onChange={(e) => {
            setNewFullName(e.target.value);
            clearFieldError("fullName", setValidateErrors);
          }}
          placeholder="Change full name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </label>
      {validateErrors.fullName && (
        <p className="text-red-500 italic">{validateErrors.fullName}</p>
      )}

      <button
        type="button"
        onClick={togglePasswordEdit}
        className="w-full px-3 py-2 border border-red-500 rounded text-red-500 mt-3"
      >
        {isEditPassword ? "Cancel" : "Change password"}
      </button>
      {isEditPassword && (
        <div className="flex flex-col gap-2">
          <input
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              clearFieldError("password", setValidateErrors);
            }}
            placeholder="New password"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {validateErrors.password && (
            <p className="text-red-500 italic">{validateErrors.password}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-rose-400 text-white rounded py-2 mt-8"
      >
        Update profile
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="w-full border border-gray-700 text-gray-700 rounded py-2"
      >
        Cancel edit profile
      </button>
    </form>
  );
}
