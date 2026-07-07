import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Select from "react-select";
import { exchangeRatesValidate, clearFieldError } from "../../utils/validate";
import dayjs from "dayjs";

export default function CreateExchangeRateForm({
  onCreateRates,
  isCreateLoading,
}) {
  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [date, setDate] = useState("");
  const [rates, setRates] = useState({});
  const [validateErrors, setValidateErrors] = useState({});

  useEffect(() => {
    const getCurrencyOptions = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.CURRENCIES.GET_CURRENCIES,
        );

        const normalizedOptions = response?.data?.map((o) => ({
          label: o.code,
          value: o.id,
        }));

        setCurrencyOptions(normalizedOptions || []);

        const defaultCurrency = normalizedOptions?.find(
          (c) => c.label === "USD",
        );

        if (defaultCurrency) {
          setSelectedBaseCurrency(defaultCurrency);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getCurrencyOptions();
  }, []);

  const handleChangeCurrency = (option) => {
    setSelectedBaseCurrency(option || null);
    setRates({});
    clearFieldError("selectedBaseCurrency", setValidateErrors);
  };

  const targetCurrencies = currencyOptions.filter(
    (option) => option.value !== selectedBaseCurrency.value,
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
        selectedBaseCurrency,
        date,
        rates,
      },
      targetCurrencies,
    );

    setValidateErrors(errors);
    if (Object.keys(errors).length) return;

    const data = {
      baseCurrencyId: selectedBaseCurrency.value,
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
          value={selectedBaseCurrency}
          onChange={handleChangeCurrency}
          options={currencyOptions}
        />
        {validateErrors.selectedBaseCurrency && (
          <p className="text-red-500 italic">
            {validateErrors.selectedBaseCurrency}
          </p>
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
              <span className="text-gray-500">
                to {selectedBaseCurrency?.label}
              </span>
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
