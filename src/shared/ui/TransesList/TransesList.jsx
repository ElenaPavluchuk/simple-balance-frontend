import PropTypes from "prop-types";
import Button from "../Button/Button";
import { Trash2, Pencil, X, Check } from "lucide-react";

TransesList.PropTypes = {
  trans: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
  editingTrans: PropTypes.object,
  category: PropTypes.array.isRequired,
  onChangeEditInput: PropTypes.func.isRequired,
  saveUpdateTrans: PropTypes.func.isRequired,
  cancelUpdateTrans: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default function TransesList({
  trans,
  isEditing,
  editingTrans,
  category,
  onChangeEditInput,
  saveUpdateTrans,
  cancelUpdateTrans,
  onEdit,
  onDelete,
}) {
  return (
    <li className="bg-white flex flex-row justify-between gap-10 rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
      {isEditing ? (
        <>
          <div className="w-full">
            <div className="flex justify-between items-center ">
              <input
                value={editingTrans?.name}
                name="name"
                onChange={onChangeEditInput}
                autoComplete="off"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="number"
                value={editingTrans?.amount}
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
                value={editingTrans?.category}
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
                value={editingTrans?.date}
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
      ) : (
        <>
          <div className="w-full">
            <div className="flex justify-between items-center ">
              <p>{trans.name}</p>
              <p>{trans.amount}</p>
            </div>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500 ">
              <span className="bg-gray-100 px-2 py-1 rounded-lg">
                {trans.category}
              </span>
              <span>{trans.date}</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-start">
            <Button onClick={() => onEdit(trans)} size={4}>
              <Pencil className="text-gray-700" />
            </Button>
            <Button onClick={() => onDelete(trans.id)} size={4}>
              <Trash2 className="text-gray-700" />
            </Button>
          </div>
        </>
      )}
    </li>
  );
}
