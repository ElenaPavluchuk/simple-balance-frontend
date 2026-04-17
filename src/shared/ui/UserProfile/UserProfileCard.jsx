export default function UserProfileCard({ user, onEdit }) {
  return (
    <div className="flex flex-col gap-3 bg-white p-4 shadow-md rounded w-md">
      {user?.profile_image_url ? (
        <img
          src={user.profile_image_url}
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
      ) : (
        <div className="w-20 h-20 bg-slate-400 rounded-full" />
      )}

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

      <button
        onClick={onEdit}
        className="w-full bg-rose-400 text-white rounded py-2 mt-8"
      >
        Edit Profile
      </button>
    </div>
  );
}
