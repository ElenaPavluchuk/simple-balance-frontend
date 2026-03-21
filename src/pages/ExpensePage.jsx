import { useState, useEffect } from "react";
import Button from "../shared/ui/Button/Button";
import DialogModal from "../shared/ui/DialogModal/DialogModal";
import CreateTransactionForm from "../shared/ui/CreateTransactionForm";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
// import TransesList from "../shared/ui/TransesList/TransesList";

export default function ExpensePage() {
  const [openDialogModal, setOpenDialogModal] = useState(false);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.TRANSACTIONS.GET_TRANSACTIONS_BY_TYPE("EXPENSE"),
        );

        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getTransactions();
  }, []);

  return (
    <div className="flex flex-col gap-20 p-10">
      <div>
        <Button onClick={() => setOpenDialogModal(true)} variant="primary">
          Add Transaction
        </Button>
      </div>
      <DialogModal
        isOpen={openDialogModal}
        onClose={() => setOpenDialogModal(false)}
        title="Add transaction"
      >
        <CreateTransactionForm onClose={() => setOpenDialogModal(false)} />
      </DialogModal>
      <div className="min-w-xl mx-auto mt-6">
        <ul className="space-y-4">
          {/* {transes
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
            ))} */}
          {/* {(response?.data || []).map((t) => (
            <span key={t.id}>{t.title}</span>
          ))} */}
        </ul>
      </div>
    </div>
  );
}
