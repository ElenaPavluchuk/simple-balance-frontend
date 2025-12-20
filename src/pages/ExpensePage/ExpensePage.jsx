import { useState } from "react";
import Button from "../../shared/ui/Button/Button";
import DialogModal from "../../shared/ui/DialogModal/DialogModal";
import AddTransForm from "../../shared/ui/AddTransForm/AddTransForm";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTransFromRedux,
  updateTransInRedux,
} from "../../app/providers/redux/slices/transesSlice";
import { expenseCategories } from "../../shared/data/transCategories";
import TransesList from "../../shared/ui/TransesList/TransesList";

export default function ExpensePage() {
  const [openAddTransModal, setOpenAddTransModal] = useState(false);
  const transes = useSelector((state) => state.transes.value);
  const dispatch = useDispatch();
  const [editingTrans, setEditingTrans] = useState(null);

  const deleteTrans = (id) => {
    dispatch(deleteTransFromRedux(id));
  };

  const editTrans = (trans) => {
    setEditingTrans(trans);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTrans((prev) => ({ ...prev, [name]: value }));
  };

  const saveUpdateTrans = () => {
    if (!editingTrans) return;

    const { id, name, amount, category, date } = editingTrans;
    dispatch(
      updateTransInRedux({
        id,
        name: name.trim(),
        amount: Number(amount),
        category,
        date,
      })
    );
    setEditingTrans(null);
  };

  const cancelUpdateTrans = () => {
    setEditingTrans(null);
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
        <AddTransForm onClose={() => setOpenAddTransModal(false)} />
      </DialogModal>
      <div className="min-w-xl mx-auto mt-6">
        <ul className="space-y-4">
          {transes
            .filter((trans) => trans.type === "expense")
            .map((trans) => (
              <TransesList
                key={trans.id}
                trans={trans}
                editingTrans={
                  editingTrans?.id === trans.id ? editingTrans : null
                }
                category={expenseCategories}
                onChangeEditInput={handleEditInputChange}
                saveUpdateTrans={saveUpdateTrans}
                cancelUpdateTrans={cancelUpdateTrans}
                onEdit={editTrans}
                onDelete={deleteTrans}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
