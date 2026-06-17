import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../slices/transactionsSlice";
import Button from "../Button";
import DialogModal from "../DialogModal";
import CreateTransactionForm from "../Transactions/CreateTransactionForm";
import TransactionsList from "../Transactions/TransactionsList";
import Loader from "../Loader";
import PropTypes from "prop-types";

TransactionsLayout.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
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
};

export default function TransactionsLayout({
  title,
  type,
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
}) {
  const [openDialogModal, setOpenDialogModal] = useState(false);
  const transactions = useSelector(selectTransactions);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
            title="Add transaction"
          >
            <CreateTransactionForm
              type={type}
              onCreate={onCreate}
              onClose={() => setOpenDialogModal(false)}
              isCreateLoading={isCreateLoading}
            />
          </DialogModal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
                isEditing={editingId === t.id}
                onDelete={onDelete}
                onEdit={onEdit}
                onSaveEdit={onSaveEdit}
                onCancelEdit={onCancelEdit}
                isDeleteLoading={deletingId === t.id}
                isSaveEditLoading={updatingId === t.id}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
