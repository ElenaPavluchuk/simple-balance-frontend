import { useState } from "react";
import {
  expenseCategories,
  incomeCategories,
} from "../../data/transCategories";

export default function AddTransForm() {
  const [transType, setTransType] = useState("expense");
  const [transes, setTranses] = useState([]);
  const [trans, setTrans] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
    type: "expense",
  });

  const categories =
    transType === "expense" ? expenseCategories : incomeCategories;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrans((prev) => ({ ...prev, [name]: value, type: transType }));
  };

  const addTrans = () => {
    const newTrans = {
      id: crypto.randomUUID(),
      ...trans,
      amount: Number(trans.amount),
    };
    setTranses([...transes, newTrans]);

    setTrans({
      name: "",
      amount: "",
      category: "",
      date: "",
      type: transType,
    });
  };

  return (
    <div className="bg-pink-100 w-96 max-w-full flex flex-col gap-6 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-center">Add Transaction</h2>
      <div className="flex justify-center gap-4">
        {["expense", "income"].map((type) => (
          <label key={type} className="flex items-center cursor-pointer">
            <input
              type="radio"
              value={type}
              checked={transType === type}
              onChange={() => setTransType(type)}
              className="hidden peer"
            />
            <span
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all capitalize
                  ${
                    transType === type
                      ? "bg-green-500 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
            >
              {type}
            </span>
          </label>
        ))}
      </div>

      <div>
        <label>Name: </label>
        <input
          value={trans.name}
          name="name"
          onChange={handleChange}
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label>Amount: </label>
        <input
          type="number"
          value={trans.amount}
          name="amount"
          onChange={handleChange}
          min="0"
          step="1"
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label>Category: </label>
        <select
          value={trans.category}
          onChange={handleChange}
          name="category"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select category</option>
          {categories.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Date: </label>
        <input
          type="date"
          value={trans.date}
          name="date"
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={addTrans}
          className="w-full py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition shadow-md"
        >
          Add Transaction
        </button>
      </div>
    </div>
  );
}
