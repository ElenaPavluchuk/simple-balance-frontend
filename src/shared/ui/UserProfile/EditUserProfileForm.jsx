import { useState } from "react";

export default function EditUserProfileForm({ user, onSave, onCancel }) {
  const [newFullName, setNewFullName] = useState(user.full_name);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { ...user, fullName: newFullName.trim() };
    onSave(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 bg-white p-4 shadow-md rounded w-md"
    >
      <h3 className="font-semibold text-center">Edit Profile</h3>
      <label>
        Full name:{" "}
        <input
          value={newFullName}
          onChange={(e) => setNewFullName(e.target.value)}
          placeholder="Change full name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-rose-400 text-white rounded py-2 mt-6"
      >
        Save edit
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="w-full border border-gray-700 text-gray-700 rounded py-2"
      >
        Cancel edit
      </button>
    </form>
  );
}
