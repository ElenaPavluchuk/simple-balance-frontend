import { Trash2, Pencil } from "lucide-react";
import dayjs from "dayjs";
import Button from "../Button";
import PropTypes from "prop-types";

TransactionCard.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    category_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    note: PropTypes.string,
    currency_symbol: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isDeleteLoading: PropTypes.bool.isRequired,
};

export default function TransactionCard({
  transaction,
  onDelete,
  onEdit,
  hideDetails,
  isDeleteLoading,
}) {
  return (
    <div className="flex gap-2">
      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p>{transaction.title}</p>
          <p>
            <span>{transaction.type === "INCOME" ? "+" : "-"}</span>
            {transaction.currency_symbol}
            {transaction.amount}
          </p>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-700">
          <span className="bg-gray-100 px-2 py-1 rounded-lg">
            <p>{transaction.category_name}</p>
          </span>
          <p>{dayjs(transaction.date).format("DD-MM-YYYY")}</p>
        </div>

        {!hideDetails && (
          <p className="italic mt-4">
            Note: <span>{transaction.note}</span>
          </p>
        )}
      </div>

      {!hideDetails && (
        <div className="flex flex-col items-center justify-between w-fit">
          <Button onClick={() => onEdit(transaction)} variant="icon">
            <Pencil className="text-gray-700" size={20} />
          </Button>
          <Button
            onClick={() => onDelete(transaction.id)}
            disabled={isDeleteLoading}
            variant="icon"
          >
            <Trash2 className="text-gray-700" size={20} />
          </Button>
        </div>
      )}
    </div>
  );
}
