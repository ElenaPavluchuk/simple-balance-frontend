import { useTransactions } from "../shared/hooks/useTransactions";
import TransactionsLayout from "../shared/ui/Layouts/TransactionsLayout";
import TransactionsList from "../shared/ui/Transactions/TransactionsList";
import Loader from "../shared/ui/Loader";

export default function ExpensePage() {
  const TRANSACTION_TYPE = "EXPENSE";
  const {
    transactions,
    openDialogModal,
    setOpenDialogModal,
    editingId,
    isLoading,
    isCreateLoading,
    deletingId,
    updatingId,
    setCurrentPage,
    hasNextPage,
    setHasNextPage,
    handleCreateTransaction,
    handleDeleteTransaction,
    handleEditTransaction,
    handleCancelEdit,
    handleSaveEdit,
  } = useTransactions(TRANSACTION_TYPE);

  return (
    <TransactionsLayout
      openDialogModal={openDialogModal}
      setOpenDialogModal={setOpenDialogModal}
      title="Expense transactions"
      type={TRANSACTION_TYPE}
      transactions={transactions.filter((t) => t.type === TRANSACTION_TYPE)}
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
      setCurrentPage={setCurrentPage}
      hasNextPage={hasNextPage}
      setHasNextPage={setHasNextPage}
    />
  );
}
