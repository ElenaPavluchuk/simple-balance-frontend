import { Trash2, Pencil } from "lucide-react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

TransactionCard.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    category_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    currency_symbol: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default function TransactionCard({
  transaction,
  onDelete,
  onEdit,
  hideDetails,
}) {
  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center ">
          <p>{transaction.title}</p>
          <div className="flex flex-row">
            <p>
              <span>{transaction.type === "INCOME" ? "+" : "-"}</span>
              {transaction.currency_symbol}
            </p>
            <p>{transaction.amount}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-500 ">
          <span className="bg-gray-100 px-2 py-1 rounded-lg">
            <p>{transaction.category_name}</p>
          </span>
          <span>{dayjs(transaction.date).format("DD-MM-YYYY")}</span>
        </div>
        {!hideDetails && (
          <p className="mt-4 italic">
            Note: <span>{transaction.note}</span>
          </p>
        )}
      </div>
      {!hideDetails && (
        <div className="flex flex-col gap-4 items-start">
          <button onClick={() => onEdit(transaction)} size={10}>
            <Pencil className="text-gray-700" />
          </button>
          <button>
            <Trash2
              onClick={() => onDelete(transaction.id)}
              className="text-gray-700"
              size={20}
            />
          </button>
        </div>
      )}
    </>
  );
}
