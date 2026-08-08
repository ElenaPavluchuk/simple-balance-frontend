import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { exchangeRateFormat } from "../../utils/format";
import Card from "../Card";
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
    <Card
      className={`flex
        ${isManagedCardStyle ? "justify-around border-b p-3" : "flex-col"}
      `}
    >
      <div className="flex justify-between w-full">
        <span className="flex items-center gap-1">
          <p className="font-medium text-emerald-700 text-lg">
            {currencySymbol}
          </p>
          <p className="text-lg font-medium text-cyan-950">
            {rate?.target_code}
          </p>
        </span>
        <p className="font-semibold text-green-700">
          {exchangeRateFormat(
            rate?.rate,
            baseCurrencyCode || selectedCurrencyCode,
          )}
        </p>
      </div>

      {date && (
        <div className="flex gap-1 items-center justify-between mt-4 text-cyan-950">
          <span className="text-xs">The rate is valid on the date:</span>
          <p className="text-sm">{date}</p>
        </div>
      )}
    </Card>
  );
}
