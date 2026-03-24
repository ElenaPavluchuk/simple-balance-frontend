import { Trash2, Pencil } from "lucide-react";

export default function TransactionCard({ transaction, onDelete, onEdit }) {
  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center ">
          <p>{transaction.title}</p>
          <div className="flex flex-row">
            <p>{transaction.currency_symbol}</p>
            <p>{transaction.amount}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-500 ">
          <span className="bg-gray-100 px-2 py-1 rounded-lg">
            {transaction.category_name}
          </span>
          <span>{transaction.date}</span>
        </div>
      </div>
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
    </>
  );
}
