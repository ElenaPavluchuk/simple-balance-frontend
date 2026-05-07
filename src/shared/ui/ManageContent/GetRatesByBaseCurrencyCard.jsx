import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Select from "react-select";
import dayjs from "dayjs";

export default function GetRatesByBaseCurrencyCard() {
  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [rates, setRates] = useState([]);

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
    //   clearFieldError("selectedBaseCurrency", setValidateErrors);
  };

  const getRatesByBaseCurrency = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.ADMINS.GET_EXCHANGE_RATES_BY_BASE_ID(
          selectedBaseCurrency.value,
        ),
      );

      console.log("response: ", response?.data);
      setRates(response?.data?.rates);
    } catch (err) {
      console.error(err);
    }
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
        {/* {validateErrors.selectedBaseCurrency && (
          <p className="text-red-500 italic">
            {validateErrors.selectedBaseCurrency}
          </p>
        )} */}
      </div>

      <button
        onClick={getRatesByBaseCurrency}
        className="px-5 py-2 border rounded mt-4"
      >
        Get rates
      </button>

      <ul>
        {rates.map((rate) => (
          <li key={rate.date} className="my-8">
            <p>{dayjs(rate.date).format("DD-MM-YYYY")}</p>
            {rate.rates.map((r) => (
              <div key={r.id} className="flex justify-around border p-3">
                <p>
                  {
                    currencyOptions.find(
                      (c) => c.value === r.target_currency_id,
                    )?.label
                  }
                </p>
                <p>{r.rate}</p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
