import { useState, useEffect } from "react";
import Select from "react-select";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
// import { useAuth } from "../context/auth/useAuth"
import { transactionsValidate } from "../utils/validate";

export default function AddTransactionForm() {
  const [type, setType] = useState("EXPENSE");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [validateErrors, setValidateErrors] = useState({});
  // and user's base currency id
  // const { user } = useAuth()

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.TRANSACTIONS.GET_CATEGORIES_BY_TYPE(type),
        );

        const normolizedOptions = response?.data?.map((o) => ({
          label: o.name,
          value: o.name,
        }));

        setCategoryOptions(normolizedOptions || []);

        const defaultCategory = normolizedOptions?.find(
          (o) => o.value === "Other",
        );

        if (defaultCategory) {
          setSelectedCategory(defaultCategory);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getCategories();
  }, [type]);

  const handleTypeChange = (type) => setType(type);

  const handleTitleChange = (value) => setTitle(value);

  const handleAmountChange = (value) => setAmount(value);

  const handleNoteChange = (value) => setNote(value);

  const handleChangeCategory = (option) => {
    setSelectedCategory(option || null);
  };

  const handleChangeDate = (value) => setDate(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = transactionsValidate({
      type,
      title,
      amount,
      selectedCategory,
      date,
    });

    setValidateErrors(errors);
    if (Object.keys(errors).length) return;
  };

  return (
    <div className="bg-pink-100 w-96 max-w-full flex flex-col gap-6 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex justify-center gap-4">
          {["EXPENSE", "INCOME"].map((t) => (
            <label key={t} className="flex items-center cursor-pointer">
              <input
                type="radio"
                value={t}
                checked={t === type}
                onChange={() => handleTypeChange(t)}
                className="hidden peer"
              />
              <span
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all capitalize
                  ${
                    t === type
                      ? "bg-green-500 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {t}
              </span>
            </label>
          ))}
          {validateErrors.type && (
            <p className="text-red-500 italic">{validateErrors.type}</p>
          )}
        </div>

        <div>
          <label>Title: </label>
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            autoComplete="off"
            placeholder="Add title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {validateErrors.title && (
            <p className="text-red-500 italic">{validateErrors.title}</p>
          )}
        </div>

        <div>
          <label>Amount: </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            min="0"
            step="1"
            autoComplete="off"
            placeholder="Add amount"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {validateErrors.amount && (
            <p className="text-red-500 italic">{validateErrors.amount}</p>
          )}
        </div>

        <div>
          <label>Select category</label>
          <Select
            value={selectedCategory}
            onChange={handleChangeCategory}
            options={categoryOptions}
          />
          {validateErrors.selectedCategory && (
            <p className="text-red-500 italic">
              {validateErrors.selectedCategory}
            </p>
          )}
        </div>

        <div>
          <label>Select date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => handleChangeDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {validateErrors.date && (
            <p className="text-red-500 italic">{validateErrors.date}</p>
          )}
        </div>

        <div>
          <label>Notes: </label>
          <textarea
            value={note}
            onChange={(e) => handleNoteChange(e.target.value)}
            autoComplete="off"
            placeholder="Add note"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </form>
      <button
        type="submit"
        className="border rounded p-2 bg-rose-400 text-white"
      >
        Add transaction
      </button>
    </div>
  );
}
