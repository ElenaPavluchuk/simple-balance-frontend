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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <Input
          value={title}
          onChange={handleTitleChange}
          label="Title"
          placeholder="Add title"
        />
        {validateErrors.title && (
          <p className="text-red-500 italic text-xs mt-1">
            {validateErrors.title}
          </p>
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
          <p className="text-red-500 italic text-xs mt-1">
            {validateErrors.amount}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs font-medium text-cyan-900">
          Select category
        </label>
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
          unstyled
          classNames={{
            control: ({ isFocused }) =>
              `w-full h-9 px-2 border rounded-md transition duration-150
              ${isFocused ? "border-sky-500 ring-2 ring-sky-500" : "border-gray-400"}`,
            valueContainer: () => "p-0",
            input: () => "m-0 p-0 text-sm text-cyan-950",
            placeholder: () => "text-sm text-gray-400",
            singleValue: () => "text-sm text-cyan-950",
            indicatorsContainer: () => "h-full",
            dropdownIndicator: () => "text-gray-500 hover:text-gray-700",
            clearIndicator: () => "text-gray-500",
            menu: () =>
              "mt-1 rounded-md border border-gray-300 bg-white shadow-lg",
            option: ({ isFocused, isSelected }) =>
              `px-3 py-2 cursor-pointer ${
                isSelected
                  ? "bg-sky-500 text-white"
                  : isFocused
                    ? "bg-sky-100"
                    : "bg-white"
              }`,
          }}
        />
        {validateErrors.selectedCategory && (
          <p className="text-red-500 italic text-xs mt-1">
            {validateErrors.selectedCategory}
          </p>
        )}
        {optionsApiError && (
          <p className="text-red-500 italic text-xs mt-1">{optionsApiError}</p>
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
          <p className="text-red-500 italic text-xs mt-1">
            {validateErrors.date}
          </p>
        )}
      </div>

      <div>
        <Input
          value={note}
          onChange={handleNoteChange}
          label="Note"
          multiline
          rows={2}
        />
      </div>

      <Button
        type="submit"
        disabled={isCreateLoading}
        variant="primary"
        className="mt-4"
      >
        {isCreateLoading ? "Saving..." : "Add transaction"}
      </Button>
    </form>
  );
}
