import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/auth/useAuth";
import { transactionsValidate, clearFieldError } from "../../utils/validate";
import Button from "../Button";
import Input from "../Input";
import { useOptions } from "../../hooks/useOptions";
import PropTypes from "prop-types";

CreateTransactionForm.propTypes = {
  type: PropTypes.oneOf(["INCOME", "EXPENSE"]).isRequired,
  onCreate: PropTypes.func.isRequired,
  isCreateLoading: PropTypes.bool,
};

export default function CreateTransactionForm({
  type,
  onCreate,
  isCreateLoading,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [validateErrors, setValidateErrors] = useState({});
  const { user } = useAuth();

  const {
    selectedOption,
    setSelectedOption,
    allOptions,
    isOptionsLoading,
    optionsApiError,
  } = useOptions({
    queryKey: [type],
    queryFn: async () => {
      const response = await axiosInstance.get(
        API_PATHS.TRANSACTIONS.GET_CATEGORIES_BY_TYPE(type),
      );

      return response.data;
    },
    initialData: "Other",
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

  const handleSubmit = async (e) => {
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
      type,
      title: title.trim(),
      amount,
      currencyId: user.base_currency_id,
      note: note.trim(),
      date,
      categoryId: selectedOption?.isCustom ? null : selectedOption?.value,
      categoryName: selectedOption?.isCustom ? selectedOption?.label : null,
    };

    onCreate(data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <Input
          value={title}
          onChange={handleTitleChange}
          label="Title"
          placeholder="Add title"
        />
        {validateErrors.title && (
          <p className="text-red-500 italic">{validateErrors.title}</p>
        )}
      </div>

      <div>
        <Input
          value={amount}
          onChange={handleAmountChange}
          type="number"
          label="Amount"
          placeholder="0.00"
          step="0.01"
        />
        {validateErrors.amount && (
          <p className="text-red-500 italic">{validateErrors.amount}</p>
        )}
      </div>

      <div>
        <label>Select category</label>
        <CreatableSelect
          isClearable
          value={selectedOption}
          onChange={handleCategoryChange}
          options={allOptions}
          getNewOptionData={(inputValue, label) => ({
            label: label.trim(),
            value: inputValue,
            isCustom: true,
          })}
          isLoading={isOptionsLoading}
        />
        {validateErrors.selectedCategory && (
          <p className="text-red-500 italic">
            {validateErrors.selectedCategory}
          </p>
        )}
        {optionsApiError && (
          <p className="text-red-500 italic">{optionsApiError}</p>
        )}
      </div>

      <div>
        <Input
          value={date}
          onChange={handleDateChange}
          type="date"
          label="Select date"
        />
        {validateErrors.date && (
          <p className="text-red-500 italic">{validateErrors.date}</p>
        )}
      </div>

      <div>
        <Input
          value={note}
          onChange={handleNoteChange}
          label="Note"
          placeholder="Add note"
          multiline
          rows={2}
        />
      </div>

      <Button type="submit" disabled={isCreateLoading} variant="primary">
        {isCreateLoading ? "Saving..." : "Add transaction"}
      </Button>
    </form>
  );
}
