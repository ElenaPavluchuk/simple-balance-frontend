import { useTransactions } from "../shared/hooks/useTransactions";
import TransactionsLayout from "../shared/ui/Layouts/TransactionsLayout";
import TransactionsList from "../shared/ui/Transactions/TransactionsList";
import Loader from "../shared/ui/Loader";

export default function IncomePage() {
  const TRANSACTION_TYPE = "INCOME";
  const {
    transactions,
    isOpenDialogModal,
    setIsOpenDialogModal,
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
      isOpenDialogModal={isOpenDialogModal}
      setIsOpenDialogModal={setIsOpenDialogModal}
      title="Income transactions"
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
