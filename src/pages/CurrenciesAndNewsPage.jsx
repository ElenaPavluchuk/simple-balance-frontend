import { useState, useEffect } from "react";
import { useAuth } from "../shared/context/auth/useAuth";
import axios from "axios";
import dayjs from "dayjs";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import ExchangeRateCard from "../shared/ui/CurrenciesAndNews/ExchangeRateCard";

export default function CurrenciesAndNewsPage() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [apiError, setApiError] = useState("");
  const { user } = useAuth();
  const targetCurrencies = ["USD", "RUB", "EUR"]
    .filter((currency) => currency !== user.currency_code)
    .join(",");
  const today = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    const getExchangeRates = async () => {
      const options = {
        method: "GET",
        url: "https://currency-conversion-and-exchange-rates.p.rapidapi.com/timeseries",
        params: {
          start_date: today,
          end_date: today,
          base: user.currency_code,
          symbols: targetCurrencies,
        },
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
          "x-rapidapi-host":
            "currency-conversion-and-exchange-rates.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.request(options);

        const normalizedRates = Object.entries(
          response?.data?.rates[today],
        ).map(([target_code, rate]) => ({
          target_code,
          rate,
        }));

        setExchangeRates(normalizedRates);
        setCurrentDate(dayjs(response?.data?.end_date).format("DD-MM-YYYY"));
      } catch (err) {
        console.warn("API failed, fallback to DB", err);

        try {
          const fallback = await axiosInstance.get(
            API_PATHS.USERS.GET_EXCHANGE_RATES,
          );

          setExchangeRates(fallback?.data?.rates);
          setCurrentDate(
            dayjs(fallback?.data?.date ?? "").format("DD-MM-YYYY"),
          );
        } catch (fallbackError) {
          console.error("Fallback also failed", fallbackError);
          setApiError("Sorry, rates are not available. Please try again later");
        }
      }
    };

    getExchangeRates();
  }, []);

  return (
    <div className="m-5">
      <h2 className="mb-5 text-center font-bold">Currencies And News Page</h2>

      <div className="bg-cyan-50 p-5 rounded w-md">
        <h3 className="font-semibold p-2 text-center">Exchange rates</h3>
        {apiError ? (
          <div className="w-md h-28 flex items-center justify-center">
            <p className="italic">{apiError}</p>
          </div>
        ) : (
          <ul className="grid gap-4">
            {exchangeRates?.map((rate) => (
              <li key={rate.target_code}>
                <ExchangeRateCard rate={rate} date={currentDate} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
