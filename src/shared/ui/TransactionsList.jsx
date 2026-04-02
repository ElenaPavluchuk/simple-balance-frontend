import TransactionCard from "./TransactionCard";
import EditingTransactionForm from "./EditingTransactionForm";
import PropTypes from "prop-types";

TransactionsList.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    category_id: PropTypes.number.isRequired,
    category_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default function TransactionsList({
  transaction,
  onDelete,
  onEdit,
  onCancel,
  onSave,
  isEditing,
}) {
  return (
    <li className="bg-white flex flex-row justify-between gap-10 rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
      {isEditing ? (
        <EditingTransactionForm
          transaction={transaction}
          onCancel={onCancel}
          onSave={onSave}
        />
      ) : (
        <TransactionCard
          transaction={transaction}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
    </li>
  );
}
