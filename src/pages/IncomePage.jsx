import { useState, useEffect } from "react";
import DialogModal from "../shared/ui/DialogModal/DialogModal";
import CreateTransactionForm from "../shared/ui/CreateTransactionForm";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import {
  deleteTransactionFromRedux,
  setTransactions,
  updateTransactionInRedux,
  selectTransactions,
} from "../shared/slices/transactionsSlice";
import { useSelector, useDispatch } from "react-redux";
import TransactionsList from "../shared/ui/TransactionsList";

export default function IncomePage() {
  const [openDialogModal, setOpenDialogModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [apiError, setApiError] = useState("");
  const transactions = useSelector(selectTransactions);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.TRANSACTIONS.GET_TRANSACTIONS_BY_TYPE("INCOME"),
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
    <div className="flex flex-col gap-20 p-10 items-center">
      <div>
        <button
          onClick={() => setOpenDialogModal(true)}
          className="p-3 border rounded"
        >
          Add Transaction
        </button>
      </div>
      <DialogModal
        isOpen={openDialogModal}
        onClose={() => setOpenDialogModal(false)}
        title="Add transaction"
      >
        <CreateTransactionForm onClose={() => setOpenDialogModal(false)} />
      </DialogModal>
      <div className="min-w-xl mx-auto">
        <ul className="space-y-4">
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
        </ul>
      </div>
      {apiError && (
        <p className="text-red-500 italic text-center">{apiError}</p>
      )}
    </div>
  );
}
