export default function DeleteAlert({ content, onDelete, onClose }) {
  return (
    <div>
      <p className="text-sm"> {content}</p>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          className="p-3 bg-gray-400 text-white rounded"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="button"
          className="p-3 bg-red-500 text-white rounded"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
