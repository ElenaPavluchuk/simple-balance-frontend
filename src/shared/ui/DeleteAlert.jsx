import Button from "./Button";
import PropTypes from "prop-types";

DeleteAlert.propTypes = {
  message: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default function DeleteAlert({ message, onDelete, onClose, isLoading }) {
  return (
    <div>
      <p className="text-sm">{message}</p>

      <div className="flex justify-between mt-6">
        <Button onClick={onDelete} disabled={isLoading} variant="primary">
          {isLoading ? "Loading..." : "Delete"}
        </Button>

        <Button onClick={onClose} variant="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
}
