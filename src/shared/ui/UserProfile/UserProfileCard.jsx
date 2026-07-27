import Button from "../Button";
import PropTypes from "prop-types";

UserProfileCard.propTypes = {
  user: PropTypes.shape({
    profile_image_url: PropTypes.string,
    user_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    user_role: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default function UserProfileCard({ user, onEdit }) {
  return (
    <div className="flex flex-col items-center gap-3 bg-white p-4 shadow-md rounded w-full max-w-md">
      {user?.profile_image_url ? (
        <img
          src={user.profile_image_url}
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
      ) : (
        <div className="w-20 h-20 bg-gray-400 rounded-full mb-8 flex items-center justify-center">
          <p className="text-white font-medium text-3xl">
            {user?.user_name?.slice(0, 1).toUpperCase()}
          </p>
        </div>
      )}

      <p className="text-md">
        <span className="italic text-sm">Name: </span>
        {user?.user_name}
      </p>

      <p className="text-md">
        <span className="italic text-sm">Email: </span>
        {user?.email}
      </p>

      {user?.user_role === "ADMIN" && (
        <p className="text-md">
          <span className="italic text-sm">Role: </span>
          {user?.user_role}
        </p>
      )}

      <Button onClick={onEdit} variant="primary" className="mt-8">
        Edit Profile
      </Button>
    </div>
  );
}
