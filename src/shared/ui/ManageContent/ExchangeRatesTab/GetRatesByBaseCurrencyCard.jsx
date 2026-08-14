import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import Select from "react-select";
import { useOptions } from "../../../hooks/useOptions";
import {
  exchangeRatesValidate,
  clearFieldError,
} from "../../../utils/validate";
import Button from "../../Button";
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
    <div className="flex flex-col min-h-120">
      <div>
        <h2 className="text-base text-slate-900 font-medium mb-3">
          Get exchange rates by base currency
        </h2>

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
            <p className="text-red-500 italic text-xs mt-1">
              {optionsApiError}
            </p>
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
