import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/auth/useAuth";
import { transactionsValidate, clearFieldError } from "../../utils/validate";

export default function CreateTransactionForm({
  type,
  onClose,
  onSave,
  isCreateLoading,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [validateErrors, setValidateErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          API_PATHS.TRANSACTIONS.GET_CATEGORIES_BY_TYPE(type),
        );

        const normalizedOptions = response?.data?.map((o) => ({
          label: o.name,
          value: o.id,
        }));

        setCategoryOptions(normalizedOptions || []);

        const defaultCategory = normalizedOptions?.find(
          (o) => o.label === "Other",
        );

        setSelectedCategory(defaultCategory || null);
      } catch (err) {
        console.error(err);
        const message =
          err?.response?.data?.message ||
          "Something went wrong. Please try again";
        setApiError(message);
      } finally {
        setIsLoading(false);
      }
    };

    getCategories();
  }, [type]);

  const handleTitleChange = (value) => {
    setTitle(value);
    clearFieldError("title", setValidateErrors);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
    clearFieldError("amount", setValidateErrors);
  };

  const handleNoteChange = (value) => setNote(value);

  const handleChangeCategory = (option) => {
    setSelectedCategory(option || null);
    clearFieldError("selectedCategory", setValidateErrors);
  };

  const handleChangeDate = (value) => {
    setDate(value);
    clearFieldError("date", setValidateErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const errors = transactionsValidate({
      title,
      amount,
      selectedCategory,
      date,
    });

    setValidateErrors(errors);
    if (Object.keys(errors).length) return;

    const data = {
      type,
      title: title.trim(),
      amount,
      currencyId: user.base_currency_id,
      note: note.trim(),
      date,
      categoryId: selectedCategory?.isCustom ? null : selectedCategory?.value,
      categoryName: selectedCategory?.isCustom ? selectedCategory?.label : null,
    };

    const success = await onSave(data);
    if (success) {
      onClose();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-pink-100 w-96 max-w-full flex flex-col gap-6 p-6 rounded-lg shadow-lg"
    >
      <div>
        <label>Title</label>
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
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          min="0.01"
          step="0.01"
          autoComplete="off"
          placeholder="0,00"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {validateErrors.amount && (
          <p className="text-red-500 italic">{validateErrors.amount}</p>
        )}
      </div>

      <div>
        <label>Select category</label>
        <CreatableSelect
          isClearable
          value={selectedCategory}
          onChange={handleChangeCategory}
          options={categoryOptions}
          getNewOptionData={(inputValue, label) => ({
            label: label.trim(),
            value: inputValue,
            isCustom: true,
          })}
          isLoading={isLoading}
        />
        {validateErrors.selectedCategory && (
          <p className="text-red-500 italic">
            {validateErrors.selectedCategory}
          </p>
        )}
      </div>

      <div>
        <label>Select date</label>
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
        <label>Note</label>
        <textarea
          value={note}
          onChange={(e) => handleNoteChange(e.target.value)}
          autoComplete="off"
          placeholder="Add note"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <button
        type="submit"
        disabled={isCreateLoading}
        className="border rounded p-2 bg-rose-400 text-white disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
      >
        {isCreateLoading ? "Saving..." : "Add transaction"}
      </button>

      {apiError && (
        <p className="text-red-500 italic text-center">{apiError}</p>
      )}
    </form>
  );
}
