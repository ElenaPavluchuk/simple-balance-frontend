import { useState, useEffect } from "react";
import TransactionsLayout from "../shared/ui/Layouts/TransactionsLayout";
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
import toast from "react-hot-toast";

export default function ExpensePage() {
  const [editingId, setEditingId] = useState(null);
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
        toast.error(
          err?.response?.data?.message ||
            "Something went wrong. Please try again",
        );
      }
    };

    getTransactions();
  }, [dispatch]);

  const deleteTransaction = async (id) => {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.TRANSACTIONS.TRANSACTIONS_BY_ID(id),
      );

      dispatch(
        deleteTransactionFromRedux(response?.data?.deletedTransaction?.id),
      );

      toast.success(response?.data?.message);
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong. Please try again",
      );
    }
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
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong. Please try again",
      );
    }
  };

  return (
    <TransactionsLayout type="EXPENSE" title="Expense transactions">
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
    </TransactionsLayout>
  );
}
