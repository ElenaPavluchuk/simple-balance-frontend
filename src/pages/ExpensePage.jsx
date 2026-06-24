import { useState, useEffect } from "react";
import TransactionsLayout from "../shared/ui/Layouts/TransactionsLayout";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import {
  selectTransactions,
  setTransactions,
  addTransactionToRedux,
  deleteTransactionFromRedux,
  updateTransactionInRedux,
} from "../shared/slices/transactionsSlice";
import { useSelector, useDispatch } from "react-redux";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const transactions = useSelector(selectTransactions);
  const dispatch = useDispatch();
  const TRANSACTION_TYPE = "EXPENSE";
  const LIMIT = 20;

  useEffect(() => {
    let isCancelled = false;

    const getTransactions = async () => {
      try {
        setIsLoading(true);

        const response = await axiosInstance.get(
          API_PATHS.TRANSACTIONS.GET_TRANSACTIONS_BY_TYPE(
            TRANSACTION_TYPE,
            currentPage,
            LIMIT,
          ),
        );

        const transactionsByType = transactions.filter(
          (t) => t.type === TRANSACTION_TYPE,
        );

        // deduplication
        const merged = [
          ...transactionsByType,
          ...(response.data.transactions ?? []),
        ];
        const unique = [...new Map(merged.map((t) => [t.id, t])).values()];

        if (!isCancelled) dispatch(setTransactions(unique));

        if (!isCancelled) setHasNextPage(response.data?.pagination?.hasNext);
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
  }, [dispatch, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setHasNextPage(false);
  }, [TRANSACTION_TYPE]);

  const onChangeCurrentPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

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

  const handleDeleteTransaction = async (id) => {
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

  const handleEditTransaction = (transaction) => setEditingId(transaction.id);

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
      type={TRANSACTION_TYPE}
      transactions={transactions}
      onCreate={handleCreateTransaction}
      onDelete={handleDeleteTransaction}
      onEdit={handleEditTransaction}
      onSaveEdit={handleSaveEdit}
      onCancelEdit={handleCancelEdit}
      isLoading={isLoading}
      isCreateLoading={isCreateLoading}
      deletingId={deletingId}
      editingId={editingId}
      updatingId={updatingId}
      onChangeCurrentPage={onChangeCurrentPage}
      hasNextPage={hasNextPage}
    />
  );
}
