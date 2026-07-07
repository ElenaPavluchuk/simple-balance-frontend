import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Select from "react-select";
import { useOptions } from "../../hooks/useOptions";
import { exchangeRatesValidate, clearFieldError } from "../../utils/validate";
import dayjs from "dayjs";

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

  const handleChangeCurrency = (option) => {
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
        value: parseFloat(value),
      })),
    };

    onCreateRates(data);
    setRates({});
    setDate("");
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-125">
      <h2 className="font-semibold mb-4">Add exchange rates</h2>
      <div>
        <label className="text-gray-500 text-sm">Select base currency:</label>
        <Select
          value={selectedOption}
          onChange={handleChangeCurrency}
          options={allOptions}
          isLoading={isOptionsLoading}
        />
        {validateErrors.selectedBaseCurrency && (
          <p className="text-red-500 italic">
            {validateErrors.selectedBaseCurrency}
          </p>
        )}
        {optionsApiError && (
          <p className="text-red-500 italic">{optionsApiError}</p>
        )}
      </div>

      <div className="mt-4">
        <label className="text-gray-500 text-sm">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            clearFieldError("date", setValidateErrors);
          }}
          className="w-full border border-gray-300 rounded px-3 py-2"
          max={dayjs().format("YYYY-MM-DD")}
        />
        {validateErrors.date && (
          <p className="text-red-500 italic">{validateErrors.date}</p>
        )}
      </div>

      <div className="mt-4">
        <h4 className="mt-6 mb-2 font-medium">Rates:</h4>
        {targetCurrencies.map((currency) => (
          <div key={currency.value}>
            <label className="text-gray-500 text-sm">
              From {currency.label}{" "}
              <span className="text-gray-500">to {selectedOption?.label}</span>
            </label>
            <input
              type="number"
              step="0.00000001"
              value={rates[currency.value] ?? ""}
              onChange={(e) => handleRateChange(currency.value, e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {validateErrors[currency.value] && (
              <p className="text-red-500 italic">
                {validateErrors[currency.value]}
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        className="px-4 py-3 border rounded mt-auto"
        type="submit"
        disabled={isCreateLoading}
      >
        {isCreateLoading ? "Loading..." : "Add rates"}
      </button>
    </form>
  );
}
