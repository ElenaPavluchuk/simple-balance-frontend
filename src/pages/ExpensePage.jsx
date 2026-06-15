import { useState, useEffect } from "react";
import TransactionsLayout from "../shared/ui/Layouts/TransactionsLayout";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import {
  addTransactionToRedux,
  deleteTransactionFromRedux,
  setTransactions,
  updateTransactionInRedux,
  selectTransactions,
} from "../shared/slices/transactionsSlice";
import { useSelector, useDispatch } from "react-redux";
import TransactionsList from "../shared/ui/Transactions/TransactionsList";
import toast from "react-hot-toast";
import Loader from "../shared/ui/Loader";

export default function ExpensePage() {
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isSaveEditLoading, setIsSaveEditLoading] = useState(false);
  const transactions = useSelector(selectTransactions);
  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;

    const getTransactions = async () => {
      try {
        setIsLoading(true);

        const response = await axiosInstance.get(
          API_PATHS.TRANSACTIONS.GET_TRANSACTIONS_BY_TYPE("EXPENSE"),
        );

        if (!isCancelled) dispatch(setTransactions(response.data || []));
      } catch (err) {
        if (!isCancelled) console.error(err);
        if (!isCancelled)
          toast.error(
            err?.response?.data?.message ||
              "Something went wrong. Please try again",
          );
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

      dispatch(addTransactionToRedux(response?.data));
      return true;
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong. Please try again",
      );
      return false;
    } finally {
      setIsCreateLoading(false);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      setIsDeleteLoading(true);

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
    } finally {
      setIsDeleteLoading(false);
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
      setIsSaveEditLoading(true);

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
    } finally {
      setIsSaveEditLoading(false);
    }
  };

  return (
    <>
      {isLoading || !transactions ? (
        <Loader className="min-h-screen flex justify-center items-center" />
      ) : (
        <TransactionsLayout
          type="EXPENSE"
          title="Expense transactions"
          onSave={handleCreateTransaction}
          isCreation={isCreateLoading}
        >
          {transactions.length === 0 && (
            <div className="bg-white h-52 rounded py-20 flex flex-col items-center justify-center">
              <p className="text-sm">No transactions yet</p>
              <p className="text-xs text-gray-300 mt-1">
                Add your first transaction to see the list
              </p>
            </div>
          )}

          {transactions.map((t) => (
            <TransactionsList
              key={t.id}
              transaction={t}
              onDelete={deleteTransaction}
              onEdit={handleEdit}
              onCancel={handleCancelEdit}
              onSave={handleSaveEdit}
              isEditing={editingId === t.id}
              isDelition={isDeleteLoading}
              isSaveEditLoading={isSaveEditLoading}
            />
          ))}
        </TransactionsLayout>
      )}
    </>
  );
}
