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
        name: editingTrans.name.trim(),
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
                editingTrans={editingTrans}
                category={expenseCategories}
                handleEditInputChange={handleEditInputChange}
                saveUpdateTrans={() => saveUpdateTrans(trans.id)}
                cancelUpdateTrans={cancelUpdateTrans}
                editTrans={() =>
                  editTrans(
                    trans.id,
                    trans.name,
                    trans.amount,
                    trans.category,
                    trans.date
                  )
                }
                deleteTrans={() => deleteTrans(trans.id)}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
