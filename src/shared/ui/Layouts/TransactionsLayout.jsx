import { useState, useEffect, useRef, useCallback } from "react";
import Button from "../Button";
import DialogModal from "../DialogModal";
import CreateTransactionForm from "../Transactions/CreateTransactionForm";
import TransactionsList from "../Transactions/TransactionsList";
import Loader from "../Loader";
import PropTypes from "prop-types";

TransactionsLayout.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onCreate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isCreateLoading: PropTypes.bool.isRequired,
  deletingId: PropTypes.number,
  editingId: PropTypes.number,
  updatingId: PropTypes.number,
  onChangeCurrentPage: PropTypes.func.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  setHasNextPage: PropTypes.func.isRequired,
};

export default function TransactionsLayout({
  title,
  type,
  transactions,
  onCreate,
  onDelete,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  isLoading,
  isCreateLoading,
  deletingId,
  editingId,
  updatingId,
  onChangeCurrentPage,
  hasNextPage,
  setHasNextPage,
}) {
  const [openDialogModal, setOpenDialogModal] = useState(false);
  const observer = useRef(null);

  useEffect(() => {
    onChangeCurrentPage(1);
    setHasNextPage(false);
  }, [type]);

  useEffect(() => {
    return () => observer.current?.disconnect();
  }, []);

  const observerTarget = useCallback(
    (node) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      if (!node) return; // ← добавить это

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
          // onChangeCurrentPage();
          onChangeCurrentPage((prev) => prev + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasNextPage, onChangeCurrentPage],
  );

  return (
    <>
      <div className="flex flex-col gap-4 mb-9 sm:flex-row sm:justify-between sm:items-center">
        <h2 className="font-semibold text-xl">{title}</h2>
        <Button onClick={() => setOpenDialogModal(true)} variant="primary">
          Add Transaction
        </Button>
      </div>

      <DialogModal
        isOpen={openDialogModal}
        onClose={() => setOpenDialogModal(false)}
        title={`New ${type === "INCOME" ? "income" : "expense"}`}
      >
        <CreateTransactionForm
          type={type}
          onCreate={onCreate}
          onClose={() => setOpenDialogModal(false)}
          isCreateLoading={isCreateLoading}
        />
      </DialogModal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {transactions.length === 0 && !isLoading && (
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
            isEditing={editingId === t.id}
            onDelete={onDelete}
            onEdit={onEdit}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            isDeleteLoading={deletingId === t.id}
            isSaveEditLoading={updatingId === t.id}
          />
        ))}

        <div
          ref={observerTarget}
          className="col-span-full flex justify-center items-center"
        >
          {isLoading && (
            <div>
              <p>Loading more transactions...</p>
              <Loader className="w-2 h-2" />
            </div>
          )}
          {transactions.length > 0 && !hasNextPage && !isLoading && (
            <p>No more transactions</p>
          )}
        </div>
      </div>
    </>
  );
}
