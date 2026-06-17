import { useState, useEffect } from "react";
import TransactionsLayout from "../shared/ui/Layouts/TransactionsLayout";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import {
  setTransactions,
  addTransactionToRedux,
  deleteTransactionFromRedux,
  updateTransactionInRedux,
} from "../shared/slices/transactionsSlice";
import { useDispatch } from "react-redux";
import TransactionsList from "../shared/ui/Transactions/TransactionsList";
import toast from "react-hot-toast";
import Loader from "../shared/ui/Loader";
import { getErrorMessage } from "../shared/utils/getErrorMessage";

export default function ExpensePage() {
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const dispatch = useDispatch();
  const transactionTypes = "EXPENSE";

  useEffect(() => {
    let isCancelled = false;

    const getTransactions = async () => {
      try {
        setIsLoading(true);

        const response = await axiosInstance.get(
          API_PATHS.TRANSACTIONS.GET_TRANSACTIONS_BY_TYPE(transactionTypes),
        );

        if (!isCancelled) dispatch(setTransactions(response.data ?? []));
      } catch (err) {
        if (!isCancelled) console.error(err);
        if (!isCancelled) toast.error(getErrorMessage(err));
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    getTransactions();

    return () => {
      isCancelled = true;
    };
  }, [dispatch]);

  const handleCreateTransaction = async (data) => {
    try {
      setIsCreateLoading(true);

      const response = await axiosInstance.post(
        API_PATHS.TRANSACTIONS.ADD_TRANSACTION,
        data,
      );

      dispatch(addTransactionToRedux(response.data));
      return true;
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
      return false;
    } finally {
      setIsCreateLoading(false);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      setDeletingId(id);

      const response = await axiosInstance.delete(
        API_PATHS.TRANSACTIONS.TRANSACTIONS_BY_ID(id),
      );

      dispatch(deleteTransactionFromRedux(id));

      toast.success(
        response.data?.message || "Transaction deleted successfully",
      );
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (transaction) => setEditingId(transaction.id);

  const handleCancelEdit = () => setEditingId(null);

  const handleSaveEdit = async (updatedTransaction) => {
    try {
      setUpdatingId(updatedTransaction.id);

      const response = await axiosInstance.put(
        API_PATHS.TRANSACTIONS.TRANSACTIONS_BY_ID(updatedTransaction.id),
        updatedTransaction,
      );

      dispatch(updateTransactionInRedux(response.data));

      setEditingId(null);
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <TransactionsLayout
      title="Expense transactions"
      type={transactionTypes}
      onCreate={handleCreateTransaction}
      onDelete={deleteTransaction}
      onEdit={handleEdit}
      onSaveEdit={handleSaveEdit}
      onCancelEdit={handleCancelEdit}
      isLoading={isLoading}
      isCreateLoading={isCreateLoading}
      deletingId={deletingId}
      editingId={editingId}
      updatingId={updatingId}
    />
  );
}
