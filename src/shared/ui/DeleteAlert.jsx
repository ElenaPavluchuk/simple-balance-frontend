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
      <p className="text-sm text-cyan-950">{message}</p>

      <div className="flex mt-9 md:flex-row md:justify-around flex-col gap-3 w-full">
        <Button
          onClick={onDelete}
          disabled={isLoading}
          variant="primary"
          className="md:w-1/3 w-full"
        >
          {isLoading ? "Loading..." : "Delete"}
        </Button>

        <Button
          onClick={onClose}
          variant="secondary"
          className="md:w-1/3 w-full"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
