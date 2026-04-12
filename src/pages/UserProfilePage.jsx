import { useState } from "react";
import { useAuth } from "../shared/context/auth/useAuth";
import UserProfileCard from "../shared/ui/UserProfile/UserProfileCard";
import EditUserProfileForm from "../shared/ui/UserProfile/EditUserProfileForm";

export default function UserProfilePage() {
  const { user } = useAuth();
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => setIsEdit(true);
  const handleSaveEdit = (data) => console.log("updated data: ", data);
  const handleCancelEdit = () => setIsEdit(false);
  return (
    <div className="m-10 flex flex-col items-center w-fit gap-5">
      <h2 className="font-bold">UserProfilePage</h2>
      {isEdit ? (
        <EditUserProfileForm
          user={user}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <UserProfileCard user={user} onEdit={handleEdit} />
      )}
    </div>
  );
}
