import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Select from "react-select";

export default function CreateExchangeRateForm() {
  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [date, setDate] = useState("");
  const [rates, setRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCurrencyOptions = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.CURRENCIES.GET_CURRENCIES,
        );

        const normolizedOptions = response?.data?.map((o) => ({
          label: o.code,
          value: o.id,
        }));

        setCurrencyOptions(normolizedOptions || []);

        const defaultCurrency = normolizedOptions?.find(
          (c) => c.label === "USD",
        );

        if (defaultCurrency) {
          setSelectedBaseCurrency(defaultCurrency);
          console.log("base currency: ", defaultCurrency);
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
    // setValidateErrors((prev) => ({ ...prev, selectedCurrency: "" }));
  };

  const targetCurrencies = currencyOptions.filter(
    (option) => option.value !== selectedBaseCurrency.value,
  );

  const handleRateChange = (targetId, value) => {
    setRates((prev) => ({
      ...prev,
      [targetId]: value === "" ? "" : parseFloat(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBaseCurrency || !date) return;

    const data = {
      baseCurrencyId: selectedBaseCurrency.value,
      date,
      rates: Object.entries(rates).map(([targetCurrencyId, value]) => ({
        targetCurrencyId: parseInt(targetCurrencyId),
        value: parseFloat(value),
      })),
    };

    try {
      setIsLoading(true);
      // await axiosInstance.post(API_PATHS.ADMINS.ADD_EXCHANGE_RATES, data);
      console.log("data to server: ", data);

      setRates({});
      setDate("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-semibold mb-4">Add exchange rates</h2>
      <div>
        <label className="text-gary-500 text-sm">Select base currency:</label>
        <Select
          value={selectedBaseCurrency}
          onChange={handleChangeCurrency}
          options={currencyOptions}
        />
        {/* {validateErrors.selectedCurrency && (
            <p className="text-red-500 italic">
              {validateErrors.selectedCurrency}
            </p>
          )} */}
      </div>

      <div className="mt-4">
        <label className="text-gary-500 text-sm">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mt-4">
        <h4 className="mt-6 mb-2 font-medium">Rates:</h4>
        {targetCurrencies.map((currency) => (
          <div key={currency.value}>
            <label className="text-gary-500 text-sm">
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
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        ))}
      </div>

      <button
        className="px-4 py-3 border rounded my-4"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Add rates"}
      </button>
    </form>
  );
}
