import TransactionCard from "./TransactionCard";
import EditTransactionForm from "./EditTransactionForm";
import Card from "../Card";
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
  isEditing: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  isDeleteLoading: PropTypes.bool.isRequired,
  isSaveEditLoading: PropTypes.bool.isRequired,
};

export default function TransactionsList({
  transaction,
  isEditing,
  onDelete,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  isDeleteLoading,
  isSaveEditLoading,
}) {
  return (
    <Card>
      {isEditing ? (
        <EditTransactionForm
          transaction={transaction}
          onSave={onSaveEdit}
          onCancel={onCancelEdit}
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
    </Card>
  );
}
