import { X, Check } from "lucide-react";
import { useState } from "react";

export default function EditingTransactionCard({
  transaction,
  onCancel,
  onSave,
}) {
  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount);
  const [date, setDate] = useState(transaction.date);

  const handleSave = () => {
    onSave({
      ...transaction,
      title,
      amount: parseFloat(amount),
      date,
    });
  };
  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center ">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
            autoComplete="off"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="amount"
            type="number"
            min="0.01"
            step="0.01"
            autoComplete="off"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-500 ">
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            placeholder="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
      <div className="flex gap-4 items-start">
        <button onClick={handleSave} size={4}>
          <Check className="text-gray-700" />
        </button>
        <button onClick={onCancel} size={4}>
          <X className="text-gray-700" />
        </button>
      </div>
    </>
  );
}
