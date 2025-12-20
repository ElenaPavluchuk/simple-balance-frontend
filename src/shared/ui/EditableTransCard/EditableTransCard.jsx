import PropTypes from "prop-types";
import Button from "../Button/Button";
import { X, Check } from "lucide-react";

EditableTransCard.propTypes = {
  editingTrans: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  category: PropTypes.array.isRequired,
  onChangeEditInput: PropTypes.func.isRequired,
  saveUpdateTrans: PropTypes.func.isRequired,
  cancelUpdateTrans: PropTypes.func.isRequired,
};

export default function EditableTransCard({
  editingTrans,
  onChangeEditInput,
  category,
  saveUpdateTrans,
  cancelUpdateTrans,
}) {
  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center ">
          <input
            value={editingTrans.name}
            name="name"
            onChange={onChangeEditInput}
            autoComplete="off"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            value={editingTrans.amount}
            name="amount"
            onChange={onChangeEditInput}
            min="0"
            step="1"
            autoComplete="off"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-500 ">
          <select
            value={editingTrans.category}
            onChange={onChangeEditInput}
            name="category"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select category</option>
            {category.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={editingTrans.date}
            name="date"
            onChange={onChangeEditInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
      <div className="flex gap-4 items-start">
        <Button onClick={saveUpdateTrans} size={4}>
          <Check className="text-gray-700" />
        </Button>
        <Button onClick={cancelUpdateTrans} size={4}>
          <X className="text-gray-700" />
        </Button>
      </div>
    </>
  );
}
