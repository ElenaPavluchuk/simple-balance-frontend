import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { exchangeRateFormat } from "../../utils/format";
import PropTypes from "prop-types";

ExchangeRateCard.propTypes = {
  rate: PropTypes.arrayOf(
    PropTypes.shape({
      target_code: PropTypes.string.isRequired,
      rate: PropTypes.string.isRequired,
    }),
  ).isRequired,
  date: PropTypes.string,
  baseCurrencyCode: PropTypes.string,
  selectedCurrencyId: PropTypes.string,
  isManagedCardStyle: PropTypes.bool,
};

export default function ExchangeRateCard({
  rate,
  date,
  baseCurrencyCode,
  selectedCurrencyId,
  isManagedCardStyle,
}) {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    let isCancelled = false;

    const getCurrencies = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.CURRENCIES.GET_CURRENCIES,
        );

        if (isCancelled) return;

        setCurrencies(response.data ?? []);
      } catch (err) {
        if (isCancelled) return;
        console.error(err);
      }
    };

    getCurrencies();

    return () => {
      isCancelled = true;
    };
  }, []);

  const currencySymbol = currencies.find(
    (currency) => currency?.name === rate?.target_code,
  )?.symbol;

  const selectedCurrencyCode = currencies.find(
    (currency) => currency?.id === Number(selectedCurrencyId),
  )?.name;

  return (
    <div
      className={`flex border-rose-300
        ${
          isManagedCardStyle
            ? "justify-around border-b p-3"
            : "flex-col p-5 bg-white rounded-xl shadow-md border-l-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        }
      `}
    >
      <div className="flex justify-between w-full">
        <span className="flex items-center gap-2">
          <p>{currencySymbol}</p>
          <p className="text-lg font-semibold">{rate?.target_code}</p>
        </span>
        <p className="font-bold text-green-700">
          {exchangeRateFormat(
            rate?.rate,
            baseCurrencyCode || selectedCurrencyCode,
          )}
        </p>
      </div>

      {date && (
        <div className="flex gap-2 items-center mt-4">
          <span className="text-xs text-italic text-gray-600">
            The rate is valid on the date:{" "}
          </span>
          <p className="text-sm text-gray-600">{date}</p>
        </div>
      )}
    </div>
  );
}
