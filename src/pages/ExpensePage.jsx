import { useState, useEffect } from "react";
import Button from "../shared/ui/Button/Button";
import DialogModal from "../shared/ui/DialogModal/DialogModal";
import CreateTransactionForm from "../shared/ui/CreateTransactionForm";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import {
  deleteTransactionFromRedux,
  setTransactions,
  updateTransactionInRedux,
} from "../shared/slices/transactionsSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectTransactions } from "../shared/slices/transactionsSlice";
// import dayjs from "dayjs";
import TransactionsList from "../shared/ui/TransactionsList";

export default function ExpensePage() {
  const [openDialogModal, setOpenDialogModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const transactions = useSelector(selectTransactions);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.TRANSACTIONS.GET_TRANSACTIONS_BY_TYPE("EXPENSE"),
        );

        // const formattedData = (response.data || []).map((t) => ({
        //   ...t,
        //   date: dayjs(t.date).format("YYYY-MM-DD"),
        // }));

        // dispatch(setTransactions(formattedData || []));
        dispatch(setTransactions(response.data || []));
      } catch (err) {
        console.error(err);
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

      dispatch(
        // updateTransactionInRedux({
        //   ...response.data,
        //   date: dayjs(response.data.date).format("YYYY-MM-DD"),
        // }),
        updateTransactionInRedux(response.data),
      );

      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-20 p-10 items-center">
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
    </div>
  );
}
