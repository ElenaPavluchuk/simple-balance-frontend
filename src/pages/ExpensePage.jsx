import { useState, useEffect } from "react";
import Button from "../shared/ui/Button";
import DialogModal from "../shared/ui/DialogModal";
import CreateTransactionForm from "../shared/ui/Transactions/CreateTransactionForm";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import {
  deleteTransactionFromRedux,
  setTransactions,
  updateTransactionInRedux,
  selectTransactions,
} from "../shared/slices/transactionsSlice";
import { useSelector, useDispatch } from "react-redux";
import TransactionsList from "../shared/ui/Transactions/TransactionsList";

export default function ExpensePage() {
  const [openDialogModal, setOpenDialogModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [apiError, setApiError] = useState("");
  const transactions = useSelector(selectTransactions);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.TRANSACTIONS.GET_TRANSACTIONS_BY_TYPE("EXPENSE"),
        );

        dispatch(setTransactions(response.data || []));
      } catch (err) {
        console.error(err);
        const message =
          err?.response?.data?.message ||
          "Something went wrong. Please try again";
        setApiError(message);
      }
    };

    getTransactions();
  }, [dispatch]);

  const deleteTransaction = async (id) => {
    await axiosInstance.delete(API_PATHS.TRANSACTIONS.TRANSACTIONS_BY_ID(id));

    dispatch(deleteTransactionFromRedux(id));
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async (updatedTransaction) => {
    try {
      const response = await axiosInstance.put(
        API_PATHS.TRANSACTIONS.TRANSACTIONS_BY_ID(updatedTransaction.id),
        updatedTransaction,
      );

      dispatch(updateTransactionInRedux(response.data));

      setEditingId(null);
    } catch (err) {
      console.error(err);
      setEditingId(null);
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again";
      setApiError(message);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between mb-9">
        <h2 className="font-semibold text-xl">Expense transactions</h2>
        <Button onClick={() => setOpenDialogModal(true)} variant="primary">
          Add Transaction
        </Button>
      </div>

      <DialogModal
        isOpen={openDialogModal}
        onClose={() => setOpenDialogModal(false)}
        title="Add transaction"
      >
        <CreateTransactionForm
          type={"EXPENSE"}
          onClose={() => setOpenDialogModal(false)}
        />
      </DialogModal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {transactions.map((t) => (
          <TransactionsList
            key={t.id}
            transaction={t}
            onDelete={deleteTransaction}
            onEdit={handleEdit}
            onCancel={handleCancelEdit}
            onSave={handleSaveEdit}
            isEditing={editingId === t.id}
          />
        ))}
      </div>
      {apiError && (
        <p className="text-red-500 italic text-center">{apiError}</p>
      )}
    </>
  );
}
