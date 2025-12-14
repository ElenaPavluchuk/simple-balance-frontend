import { useState } from "react";
import Button from "../Button/Button";
import {
  expenseCategories,
  incomeCategories,
} from "../../data/transCategories";
import { useDispatch } from "react-redux";
import { addTransToRedux } from "../../../app/providers/redux/slices/transesSlice";

export default function AddTransCard({ onClose }) {
  const dispatch = useDispatch();
  const [transType, setTransType] = useState("expense");
  const [trans, setTrans] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
    type: "expense",
  });
  const categories =
    transType === "expense" ? expenseCategories : incomeCategories;

  const handleTypeChange = (type) => {
    setTransType(type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrans((prev) => ({ ...prev, [name]: value, type: transType }));
  };

  const addTrans = () => {
    dispatch(
      addTransToRedux({
        id: crypto.randomUUID(),
        name: trans.name.trim(),
        amount: Number(trans.amount),
        ...trans,
      })
    );

    onClose();
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
              onChange={() => handleTypeChange(type)}
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="flex justify-center">
        <Button
          onClick={addTrans}
          className="w-full py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition shadow-md"
        >
          Add Transaction
        </Button>
      </div>
    </div>
  );
}
