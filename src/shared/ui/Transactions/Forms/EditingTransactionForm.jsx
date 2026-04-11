import { X, Check } from "lucide-react";
import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import { transactionsValidate, clearFieldError } from "../../../utils/validate";
import dayjs from "dayjs";
import PropTypes from "prop-types";

EditingTransactionForm.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    category_id: PropTypes.number.isRequired,
    category_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

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
  const [note, setNote] = useState(transaction.notes);
  const [validateErrors, setValidateErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true);

      try {
        const response = await axiosInstance.get(
          API_PATHS.TRANSACTIONS.GET_CATEGORIES_BY_TYPE(transaction.type),
        );

        const normalizedOptions = response?.data?.map((o) => ({
          label: o.name,
          value: o.id,
        }));

        setCategoryOptions(normalizedOptions || []);

        setSelectedCategory(
          normalizedOptions?.find((o) => o.value === transaction.category_id) ||
            null,
        );
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
  }, [transaction.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

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
      title: title.trim(),
      amount: parseFloat(amount),
      date,
      categoryId: selectedCategory?.isCustom ? null : selectedCategory?.value,
      categoryName: selectedCategory?.isCustom ? selectedCategory?.label : null,
      notes: note.trim(),
    };

    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
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
      <div className="flex flex-row justify-between items-center mt-2 text-sm text-gray-500">
        <div className="w-1/2">
          <CreatableSelect
            isClearable
            value={selectedCategory}
            options={categoryOptions}
            onChange={(option) => {
              setSelectedCategory(option || null);
              clearFieldError("selectedCategory", setValidateErrors);
            }}
            getNewOptionData={(inputValue, label) => ({
              label: label.trim(),
              value: inputValue,
              isCustom: true,
            })}
            isLoading={isLoading}
          />
          {validateErrors.selectedCategory && (
            <p className="text-red-500 italic text-xs">
              {validateErrors.selectedCategory}
            </p>
          )}
        </div>

        <div className="flex flex-col w-1/2">
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
            <p className="text-red-500 italic text-xs">{validateErrors.date}</p>
          )}
        </div>
      </div>
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Note"
        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <div className="flex gap-4 justify-center mt-4">
        <button type="submit" disabled={isLoading}>
          <Check className={isLoading ? "text-gray-300" : "text-gray-700"} />
        </button>
        <button type="button" onClick={onCancel} disabled={isLoading}>
          <X className="text-gray-700" />
        </button>

        {apiError && (
          <p className="text-red-500 italic text-center">{apiError}</p>
        )}
      </div>
    </form>
  );
}
