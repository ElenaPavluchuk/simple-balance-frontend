import { useState } from "react";

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

  const expenseCategories = [
    { label: "Food", value: "food" },
    { label: "Rent", value: "rent" },
    { label: "Transport", value: "transport" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Other", value: "other" },
  ];

  const incomeCategories = [
    { label: "Salary", value: "salary" },
    { label: "Freelance", value: "freelance" },
    { label: "Investment", value: "investment" },
    { label: "Gift", value: "gift" },
    { label: "Other", value: "other" },
  ];

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
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-pink-100 w-fit flex flex-col gap-5 p-4 rounded">
        <div className="flex items-center justify-center">
          <label>
            <input
              type="radio"
              value="expense"
              checked={transType === "expense"}
              onChange={() => setTransType("expense")}
              className="peer hidden"
            />
            <span className="block px-4 py-2 rounded-lg text-sm font-medium peer-checked:border peer-checked:border-green-500 transition">
              Expense
            </span>
          </label>

          <label>
            <input
              type="radio"
              value="income"
              checked={transType === "income"}
              onChange={() => setTransType("income")}
              className="peer hidden"
            />
            <span className="block px-4 py-2 rounded-lg text-sm font-medium peer-checked:border peer-checked:border-green-500 transition">
              Income
            </span>
          </label>
        </div>

        <div>
          <label>Name: </label>
          <input
            type="text"
            value={trans.name}
            name="name"
            onChange={handleChange}
            className="border rounded w-75 ml-8"
            autoComplete="off"
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
            className="border rounded w-75 ml-5"
            autoComplete="off"
          />
        </div>

        <div>
          <label>Category: </label>
          <select
            value={trans.category}
            onChange={handleChange}
            name="category"
            className="border rounded w-75 ml-3"
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
            className="border rounded w-75 ml-10"
          />
        </div>

        <div className="flex justify-center">
          <button onClick={addTrans} className="border rounded p-2">
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
