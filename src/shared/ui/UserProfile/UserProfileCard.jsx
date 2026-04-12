import { useAuth } from "../../context/auth/useAuth";

export default function UserProfileCard() {
  const { user } = useAuth();

  return (
    <div className="mt-5 flex flex-col gap-3 bg-white p-4 shadow-md rounded">
      <p className="text-md">
        <span className="italic text-sm">Full name: </span>
        {user.full_name}
      </p>

      <p className="text-md">
        <span className="italic text-sm">Email: </span>
        {user.email}
      </p>

      {user.user_role === "ADMIN" && (
        <p className="text-md">
          <span className="italic text-sm">Role: </span>
          {user.user_role}
        </p>
      )}
    </div>
  );
}
