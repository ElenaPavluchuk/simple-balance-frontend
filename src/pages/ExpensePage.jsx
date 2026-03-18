import { useState } from "react";
import Button from "../shared/ui/Button/Button";
import DialogModal from "../shared/ui/DialogModal/DialogModal";
import AddTransactionForm from "../shared/ui/AddTransactionForm";
import { useTransActions } from "../shared/lib/customHooks/useTransActions";
import { expenseCategories } from "../shared/data/transCategories";
import TransesList from "../shared/ui/TransesList/TransesList";

export default function ExpensePage() {
  const [openAddTransModal, setOpenAddTransModal] = useState(false);
  const {
    transes,
    editingTrans,
    deleteTrans,
    editTrans,
    handleEditInputChange,
    saveUpdateTrans,
    cancelUpdateTrans,
  } = useTransActions();

  return (
    <div className="flex flex-col gap-20 p-10">
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
        <AddTransactionForm onClose={() => setOpenAddTransModal(false)} />
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
