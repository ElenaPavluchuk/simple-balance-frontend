import { X, Check } from "lucide-react";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { transactionsValidate, clearFieldError } from "../../utils/validate";
import dayjs from "dayjs";
import Input from "../Input";
import Button from "../Button";
import { useOptions } from "../../hooks/useOptions";
import PropTypes from "prop-types";

EditTransactionForm.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    category_id: PropTypes.number.isRequired,
    category_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isSaveEditLoading: PropTypes.bool.isRequired,
};

export default function EditTransactionForm({
  transaction,
  onSave,
  onCancel,
  isSaveEditLoading,
}) {
  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount);
  const [date, setDate] = useState(
    transaction.date ? dayjs(transaction.date).format("YYYY-MM-DD") : "",
  );
  const [note, setNote] = useState(transaction.note);
  const [validateErrors, setValidateErrors] = useState({});

  const {
    selectedOption,
    setSelectedOption,
    allOptions,
    isOptionsLoading,
    optionsApiError,
  } = useOptions({
    queryKey: [transaction.id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        API_PATHS.TRANSACTIONS.GET_CATEGORIES_BY_TYPE(transaction.type),
      );

      return response.data;
    },
    initialData: transaction.category_id,
  });

  const handleTitleChange = (value) => {
    setTitle(value);
    clearFieldError("title", setValidateErrors);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
    clearFieldError("amount", setValidateErrors);
  };

  const handleNoteChange = (value) => setNote(value);

  const handleCategoryChange = (option) => {
    setSelectedOption(option || null);
    clearFieldError("selectedCategory", setValidateErrors);
  };

  const handleDateChange = (value) => {
    setDate(value);
    clearFieldError("date", setValidateErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = transactionsValidate({
      title,
      amount,
      selectedCategory: selectedOption,
      date,
    });

    setValidateErrors(errors);

    if (Object.keys(errors).length) return;

    const data = {
      ...transaction,
      title: title.trim(),
      amount,
      date,
      categoryId: selectedOption?.isCustom ? null : selectedOption?.value,
      categoryName: selectedOption?.isCustom ? selectedOption?.label : null,
      note: note.trim(),
    };

    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <div className="w-full">
          <Input
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
          />
          {validateErrors.title && (
            <p className="text-red-500 italic text-xs mt-1">
              {validateErrors.title}
            </p>
          )}
        </div>

        <div className="w-full">
          <Input
            value={amount}
            onChange={handleAmountChange}
            type="number"
            placeholder="0.00"
            step="0.01"
          />
          {validateErrors.amount && (
            <p className="text-red-500 italic text-xs mt-1">
              {validateErrors.amount}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between gap-2 text-sm text-gray-500">
        <div className="w-1/2">
          <CreatableSelect
            isClearable
            value={selectedOption}
            options={allOptions}
            onChange={handleCategoryChange}
            getNewOptionData={(inputValue, label) => ({
              label: label.trim(),
              value: inputValue,
              isCustom: true,
            })}
            isLoading={isOptionsLoading}
          />
          {validateErrors.selectedCategory && (
            <p className="text-red-500 italic text-xs mt-1">
              {validateErrors.selectedCategory}
            </p>
          )}
          {optionsApiError && (
            <p className="text-red-500 italic">{optionsApiError}</p>
          )}
        </div>

        <div className="w-1/2">
          <Input value={date} onChange={handleDateChange} type="date" />
          {validateErrors.date && (
            <p className="text-red-500 italic text-xs mt-1">
              {validateErrors.date}
            </p>
          )}
        </div>
      </div>
      <Input
        value={note}
        onChange={handleNoteChange}
        placeholder="Note"
        multiline
        rows={2}
      />

      <div className="flex gap-4 justify-center mt-4">
        <Button type="submit" variant="icon" disabled={isSaveEditLoading}>
          <Check className="text-gray-700" />
        </Button>
        <Button variant="icon" onClick={onCancel} disabled={isSaveEditLoading}>
          <X className="text-gray-700" />
        </Button>
      </div>
    </form>
  );
}
