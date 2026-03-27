import { X, Check } from "lucide-react";
import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { transactionsValidate, clearFieldError } from "../utils/validate";
import dayjs from "dayjs";

export default function EditingTransactionForm({
  transaction,
  onCancel,
  onSave,
}) {
  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount);
  const [date, setDate] = useState(
    transaction.date ? dayjs(transaction.date).format("YYYY-MM-DD") : "",
  );
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [validateErrors, setValidateErrors] = useState({});
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.TRANSACTIONS.GET_CATEGORIES_BY_TYPE(transaction.type),
        );

        const normolizedOptions = response?.data?.map((o) => ({
          label: o.name,
          value: o.id,
        }));

        setCategoryOptions(normolizedOptions || []);

        setSelectedCategory(
          normolizedOptions?.find((o) => o.value === transaction.category_id) ||
            null,
        );
      } catch (err) {
        console.error(err);
        const message =
          err?.response?.data?.message ||
          "Something went wrong. Please try again";
        setApiError(message);
      }
    };

    getCategories();
  }, [transaction]);

  const handleSave = () => {
    const errors = transactionsValidate({
      title,
      amount,
      selectedCategory,
      date,
    });

    setValidateErrors(errors);

    if (Object.keys(errors).length) return;

    const data = {
      ...transaction,
      title,
      amount: parseFloat(amount),
      date,
      categoryId: selectedCategory?.__isNew__ ? null : selectedCategory?.value,
      categoryName: selectedCategory?.__isNew__
        ? selectedCategory?.label
        : null,
    };

    onSave(data);
  };

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <div className="w-full flex flex-col gap-1">
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                clearFieldError("title", setValidateErrors);
              }}
              placeholder="title"
              autoComplete="off"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {validateErrors.title && (
              <p className="text-red-500 italic text-xs">
                {validateErrors.title}
              </p>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <input
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                clearFieldError("amount", setValidateErrors);
              }}
              placeholder="amount"
              type="number"
              min="0.01"
              step="0.01"
              autoComplete="off"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {validateErrors.amount && (
              <p className="text-red-500 italic text-xs">
                {validateErrors.amount}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-500 ">
          <div className="w-full flex flex-col gap-1">
            <CreatableSelect
              isClearable
              value={selectedCategory}
              options={categoryOptions}
              onChange={(option) => {
                setSelectedCategory(option || null);
                clearFieldError("selectedCategory", setValidateErrors);
              }}
            />
            {validateErrors.selectedCategory && (
              <p className="text-red-500 italic text-xs">
                {validateErrors.selectedCategory}
              </p>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <input
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                clearFieldError("date", setValidateErrors);
              }}
              type="date"
              placeholder="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {validateErrors.date && (
              <p className="text-red-500 italic text-xs">
                {validateErrors.date}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-start">
        <button onClick={handleSave} size={4}>
          <Check className="text-gray-700" />
        </button>
        <button onClick={onCancel} size={4}>
          <X className="text-gray-700" />
        </button>

        {apiError && (
          <p className="text-red-500 italic text-center">{apiError}</p>
        )}
      </div>
    </>
  );
}
