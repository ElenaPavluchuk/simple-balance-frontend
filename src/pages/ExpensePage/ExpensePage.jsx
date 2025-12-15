import { useState } from "react";
import Button from "../../shared/ui/Button/Button";
import DialogModal from "../../shared/ui/DialogModal/DialogModal";
import AddTransCard from "../../shared/ui/AddTransCard/AddTransCard";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTransFromRedux,
  updateTransInRedux,
} from "../../app/providers/redux/slices/transesSlice";
import { Trash2, Pencil, X, Check } from "lucide-react";
import { expenseCategories } from "../../shared/data/transCategories";

export default function ExpensePage() {
  const [openAddTransModal, setOpenAddTransModal] = useState(false);
  const transes = useSelector((state) => state.transes.value);
  const dispatch = useDispatch();
  const [editingTrans, setEditingTrans] = useState({
    id: null,
    name: "",
    amount: "",
    category: "",
    date: "",
  });

  const deleteTrans = (id) => {
    dispatch(deleteTransFromRedux(id));
  };

  const editTrans = (id, currName, currAmount, currCategory, currDate) => {
    setEditingTrans({
      id,
      name: currName,
      amount: currAmount,
      category: currCategory,
      date: currDate,
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTrans((prev) => ({ ...prev, [name]: value }));
  };

  const saveUpdateTrans = (id) => {
    dispatch(
      updateTransInRedux({
        id,
        name: editingTrans.name,
        amount: Number(editingTrans.amount),
        category: editingTrans.category,
        date: editingTrans.date,
      })
    );
    setEditingTrans({
      id: null,
      name: "",
      amount: "",
      category: "",
      date: "",
    });
  };

  const cancelUpdateTrans = () => {
    setEditingTrans({
      id: null,
      name: "",
      amount: "",
      category: "",
      date: "",
    });
  };

  return (
    <div className="flex flex-col gap-20">
      <div>
        <Button onClick={() => setOpenAddTransModal(true)} variant="primary">
          Add Transaction
        </Button>
      </div>
      <DialogModal
        isOpen={openAddTransModal}
        onClose={() => setOpenAddTransModal(false)}
        title="Add transaction"
      >
        <AddTransCard onClose={() => setOpenAddTransModal(false)} />
      </DialogModal>

      <div className="min-w-xl mx-auto mt-6">
        <ul className="space-y-4">
          {transes
            .filter((trans) => trans.type === "expense")
            .map((trans) => (
              <li
                key={trans.id}
                className="bg-white flex flex-row justify-between gap-10 rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition"
              >
                {editingTrans.id === trans.id ? (
                  <>
                    <div className="w-full">
                      <div className="flex justify-between items-center ">
                        <input
                          value={editingTrans.name}
                          name="name"
                          onChange={handleEditInputChange}
                          autoComplete="off"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="number"
                          value={editingTrans.amount}
                          name="amount"
                          onChange={handleEditInputChange}
                          min="0"
                          step="1"
                          autoComplete="off"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2 text-sm text-gray-500 ">
                        <select
                          value={editingTrans.category}
                          onChange={handleEditInputChange}
                          name="category"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">Select category</option>
                          {expenseCategories.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="date"
                          value={editingTrans.date}
                          name="date"
                          onChange={handleEditInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <Button
                        onClick={() => saveUpdateTrans(trans.id)}
                        size={4}
                      >
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
                      <Button
                        onClick={() =>
                          editTrans(
                            trans.id,
                            trans.name,
                            trans.amount,
                            trans.category,
                            trans.date
                          )
                        }
                        size={4}
                      >
                        <Pencil className="text-gray-700" />
                      </Button>
                      <Button onClick={() => deleteTrans(trans.id)} size={4}>
                        <Trash2 className="text-gray-700" />
                      </Button>
                    </div>
                  </>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
