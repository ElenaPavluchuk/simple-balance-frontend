import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Select from "react-select";
import { useOptions } from "../../hooks/useOptions";
import { exchangeRatesValidate, clearFieldError } from "../../utils/validate";
import Button from "../Button";
import PropTypes from "prop-types";

GetRatesByBaseCurrencyCard.propTypes = {
  onGetRates: PropTypes.func.isRequired,
  isGetLoading: PropTypes.bool.isRequired,
};

export default function GetRatesByBaseCurrencyCard({
  onGetRates,
  isGetLoading,
}) {
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
    clearFieldError("selectedBaseCurrency", setValidateErrors);
  };

  const handleGetRates = () => {
    const errors = exchangeRatesValidate({
      selectedBaseCurrency: selectedOption,
    });

    setValidateErrors(errors);
    if (Object.keys(errors).length) return;

    onGetRates(selectedOption);
  };

  return (
    <div className="flex flex-col min-h-125">
      <div>
        <h2 className="font-semibold mb-4">
          Get exchange rates by base currency
        </h2>
        <div>
          <label className="text-gray-500 text-sm">Select base currency:</label>
          <Select
            value={selectedOption}
            onChange={handleCurrencyChange}
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
      </div>

      <Button
        onClick={handleGetRates}
        disabled={isGetLoading}
        variant="primary"
        className="mt-auto"
      >
        {isGetLoading ? "Loading..." : "Get rates"}
      </Button>
    </div>
  );
}
