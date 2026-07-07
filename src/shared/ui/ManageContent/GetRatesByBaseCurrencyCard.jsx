import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Select from "react-select";
import { exchangeRatesValidate, clearFieldError } from "../../utils/validate";

export default function GetRatesByBaseCurrencyCard({ onGetRates }) {
  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);
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
    clearFieldError("selectedBaseCurrency", setValidateErrors);
  };

  const handleGetRates = () => {
    const errors = exchangeRatesValidate({
      selectedBaseCurrency,
    });

    setValidateErrors(errors);
    if (Object.keys(errors).length) return;

    onGetRates(selectedBaseCurrency);
  };

  return (
    <div>
      <h2 className="font-semibold mb-4">
        Get exchange rates by base currency
      </h2>
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

      <button
        onClick={handleGetRates}
        className="px-5 py-2 border rounded mt-4"
      >
        Get rates
      </button>
    </div>
  );
}
