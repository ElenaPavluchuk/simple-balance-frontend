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
import { getErrorMessage } from "../shared/utils/getErrorMessage";

export default function IncomePage() {
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const transactions = useSelector(selectTransactions);
  const dispatch = useDispatch();
  const transactionTypes = "INCOME";

  useEffect(() => {
    let isCancelled = false;

    const getTransactions = async () => {
      try {
        setIsLoading(true);

        const response = await axiosInstance.get(
          API_PATHS.TRANSACTIONS.GET_TRANSACTIONS_BY_TYPE("INCOME"),
        );

        if (!isCancelled) dispatch(setTransactions(response.data || []));
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
      setSavingId(updatedTransaction.id);

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
      setSavingId(null);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader className="min-h-screen flex justify-center items-center" />
      ) : (
        <TransactionsLayout
          type={transactionTypes}
          title="Income transactions"
          onSave={handleCreateTransaction}
          isCreateLoading={isCreateLoading}
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
              isDeleteLoading={deletingId === t.id}
              isSaveEditLoading={savingId === t.id}
            />
          ))}
        </TransactionsLayout>
      )}
    </>
  );
}
