import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import Select from "react-select";
import { useOptions } from "../../../hooks/useOptions";
import {
  exchangeRatesValidate,
  clearFieldError,
} from "../../../utils/validate";
import dayjs from "dayjs";
import Button from "../../Button";
import Input from "../../Input";
import PropTypes from "prop-types";

CreateExchangeRateForm.propTypes = {
  onCreateRates: PropTypes.func.isRequired,
  isCreateLoading: PropTypes.bool.isRequired,
};

export default function CreateExchangeRateForm({
  onCreateRates,
  isCreateLoading,
}) {
  const [date, setDate] = useState("");
  const [rates, setRates] = useState({});
  const [validateErrors, setValidateErrors] = useState({});

  const {
    selectedOption,
    setSelectedOption,
    allOptions,
    isOptionsLoading,
    optionsApiError,
  } = useOptions({
    queryKey: [],
    queryFn: async () => {
      const response = await axiosInstance.get(
        API_PATHS.CURRENCIES.GET_CURRENCIES,
      );

      return response.data;
    },
    initialData: "USD",
  });

  const handleCurrencyChange = (option) => {
    setSelectedOption(option || null);
    setRates({});
    clearFieldError("selectedBaseCurrency", setValidateErrors);
  };

  const targetCurrencies = allOptions.filter(
    (option) => option?.value !== selectedOption?.value,
  );

  const handleRateChange = (targetId, value) => {
    setRates((prev) => ({
      ...prev,
      [targetId]: value,
    }));
    clearFieldError(targetId, setValidateErrors);
  };

  const handleDateChange = (e) => {
    setDate(e);
    clearFieldError("date", setValidateErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = exchangeRatesValidate(
      {
        selectedBaseCurrency: selectedOption,
        date,
        rates,
      },
      targetCurrencies,
    );

    setValidateErrors(errors);
    if (Object.keys(errors).length) return;

    const data = {
      baseCurrencyId: selectedOption.value,
      date,
      rates: Object.entries(rates).map(([targetCurrencyId, value]) => ({
        targetCurrencyId: parseInt(targetCurrencyId),
        value: value,
      })),
    };

    onCreateRates(data);

    setRates({});
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-100">
      <h4 className="text-base text-slate-900 font-medium mb-3">
        Add exchange rates by base currency
      </h4>

      <div>
        <label className="text-xs font-medium text-cyan-900">
          Select base currency:
        </label>
        <Select
          value={selectedOption}
          onChange={handleCurrencyChange}
          options={allOptions}
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
        {validateErrors.selectedBaseCurrency && (
          <p className="text-red-500 italic text-xs mt-1">
            {validateErrors.selectedBaseCurrency}
          </p>
        )}
        {optionsApiError && (
          <p className="text-red-500 italic text-xs mt-1">{optionsApiError}</p>
        )}
      </div>

      <div className="mt-1">
        <Input
          value={date}
          type="date"
          onChange={handleDateChange}
          max={dayjs().format("YYYY-MM-DD")}
          label="Date: "
        />
        {validateErrors.date && (
          <p className="text-red-500 italic text-xs mt-1">
            {validateErrors.date}
          </p>
        )}
      </div>

      <h4 className="mt-4 text-base text-slate-900">Rates</h4>
      {targetCurrencies.map((currency) => (
        <div key={currency.value}>
          <label className="text-xs font-medium text-cyan-900">
            From {selectedOption?.label}{" "}
            <span className="text-gray-500">to {currency.label}</span>
          </label>
          <input
            type="number"
            step="0.00000001"
            value={rates[currency.value] ?? ""}
            onChange={(e) => handleRateChange(currency.value, e.target.value)}
            className="mb-1 w-full h-9 px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-150 ease-in-out"
          />
          {validateErrors[currency.value] && (
            <p className="text-red-500 italic text-xs mt-1">
              {validateErrors[currency.value]}
            </p>
          )}
        </div>
      ))}

      <Button
        type="submit"
        disabled={isCreateLoading}
        variant="primary"
        className="mt-auto"
      >
        {isCreateLoading ? "Loading..." : "Add rates"}
      </Button>
    </form>
  );
}
