import TransactionCard from "./TransactionCard";
import EditTransactionForm from "./EditTransactionForm";
import PropTypes from "prop-types";

TransactionsList.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    category_id: PropTypes.number.isRequired,
    category_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  isDeleteLoading: PropTypes.bool.isRequired,
  isSaveEditLoading: PropTypes.bool.isRequired,
};

export default function TransactionsList({
  transaction,
  onDelete,
  onEdit,
  onCancel,
  onSave,
  isEditing,
  isDeleteLoading,
  isSaveEditLoading,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
      {isEditing ? (
        <EditTransactionForm
          transaction={transaction}
          onCancel={onCancel}
          onSave={onSave}
          isSaveEditLoading={isSaveEditLoading}
        />
      ) : (
        <TransactionCard
          transaction={transaction}
          onDelete={onDelete}
          onEdit={onEdit}
          isDeleteLoading={isDeleteLoading}
        />
      )}
    </div>
  );
}
