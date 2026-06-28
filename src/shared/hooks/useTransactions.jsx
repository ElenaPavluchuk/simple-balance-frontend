import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import {
  selectTransactions,
  addTransactionToRedux,
  deleteTransactionFromRedux,
  setTransactions,
  updateTransactionInRedux,
} from "../redux/slices/transactionsSlice";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/getErrorMessage";

export function useTransactions(type) {
  const [openDialogModal, setOpenDialogModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const transactions = useSelector(selectTransactions);
  const dispatch = useDispatch();
  const LIMIT = 2;

  useEffect(() => {
    let isCancelled = false;

    const getTransactions = async () => {
      setIsLoading(true);

      try {
        const response = await axiosInstance.get(
          API_PATHS.TRANSACTIONS.GET_TRANSACTIONS_BY_TYPE(
            type,
            currentPage,
            LIMIT,
          ),
        );

        if (isCancelled) return;

        dispatch(setTransactions(response.data.transactions ?? []));

        setHasNextPage(response.data.pagination.hasNext ?? false);
      } catch (err) {
        if (isCancelled) return;
        console.error(err);
        toast.error(getErrorMessage(err));
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    getTransactions();

    return () => {
      isCancelled = true;
    };
  }, [dispatch, type, currentPage]);

  const handleCreateTransaction = async (data) => {
    setIsCreateLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.TRANSACTIONS.ADD_TRANSACTION,
        data,
      );

      dispatch(addTransactionToRedux(response.data));

      setOpenDialogModal(false);
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setIsCreateLoading(false);
    }
  };

  const handleDeleteTransaction = async (id) => {
    setDeletingId(id);

    try {
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
    setUpdatingId(updatedTransaction.id);

    try {
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

  return {
    // state
    transactions,
    openDialogModal,
    setOpenDialogModal,
    editingId,
    isLoading,
    isCreateLoading,
    deletingId,
    updatingId,
    currentPage,
    setCurrentPage,
    hasNextPage,
    setHasNextPage,
    // handlers
    handleCreateTransaction,
    handleDeleteTransaction,
    handleEditTransaction,
    handleCancelEdit,
    handleSaveEdit,
  };
}
