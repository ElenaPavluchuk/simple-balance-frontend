import TransactionCard from "./TransactionCard";
import EditingTransactionForm from "./EditingTransactionForm";

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
