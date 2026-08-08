import { useEffect, useRef, useCallback } from "react";
import Button from "../Button";
import DialogModal from "../DialogModal";
import CreateTransactionForm from "../Transactions/CreateTransactionForm";
import TransactionsList from "../Transactions/TransactionsList";
import Loader from "../Loader";
import CustomLineChart from "../Transactions/CustomLineChart";
import Card from "../Card";
import { groupTransactionsByMonth } from "../../utils/sort";
import PropTypes from "prop-types";

TransactionsLayout.propTypes = {
  openDialogModal: PropTypes.bool.isRequired,
  setOpenDialogModal: PropTypes.func.isRequired,
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
  setCurrentPage: PropTypes.func.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
};

export default function TransactionsLayout({
  openDialogModal,
  setOpenDialogModal,
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
  setCurrentPage,
  hasNextPage,
}) {
  const observer = useRef(null);
  const groupedTransactions = groupTransactionsByMonth(transactions);

  useEffect(() => {
    return () => observer.current?.disconnect();
  }, []);

  const observerTarget = useCallback(
    (node) => {
      if (!node) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
          setCurrentPage((prev) => prev + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasNextPage, setCurrentPage],
  );

  return (
    <>
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h2 className="text-3xl text-emerald-800">{title}</h2>
          <p className="text-xs md:text-sm text-cyan-900 mt-1">
            Transaction overview: List & Last 10 Transactions Chart
          </p>
        </div>
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

      <div className="flex flex-col lg:flex-row gap-5 h-screen">
        <Card className="flex-1 bg-amber-200 h-fit min-h-90 mt-1">
          {transactions.length === 0 && !isLoading ? (
            <div className="flex flex-col min-h-77.5 items-center justify-center">
              <p className="text-sm text-cyan-950">No transactions yet</p>
              <p className="text-xs text-gray-300 mt-1">
                Add your first transaction to see the chart
              </p>
            </div>
          ) : (
            <CustomLineChart transactions={transactions} />
          )}
        </Card>

        <div className="flex flex-col flex-1 lg:min-h-0 gap-5">
          <div className="flex flex-col gap-5 lg:overflow-y-auto min-h-0">
            {transactions.length === 0 && !isLoading && (
              <Card className="flex min-h-90 flex-col items-center justify-center mt-1">
                <p className="text-sm text-cyan-950">No transactions yet</p>
                <p className="text-xs text-gray-300 mt-1">
                  Add your first transaction to see the list
                </p>
              </Card>
            )}

            {groupedTransactions.map((group) => (
              <section key={group.key}>
                <h3 className="text-lg font-medium text-slate-900 mb-2 mt-1">
                  {group.label}
                </h3>

                <div className="flex flex-col gap-3">
                  {group.transactions.map((t) => (
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
              </section>
            ))}

            <div
              ref={observerTarget}
              className="flex justify-center items-center"
            >
              {isLoading && (
                <div className="flex flex-col items-center gap-1">
                  <p className="text-gray-300 text-xs">
                    Loading more transactions...
                  </p>
                  <Loader className="w-4 h-4" />
                </div>
              )}

              {!hasNextPage && !isLoading && transactions.length !== 0 && (
                <p className="text-gray-300 text-xs">No more transactions</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
