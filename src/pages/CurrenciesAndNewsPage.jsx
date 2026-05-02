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
        ).map(([currency, value]) => ({
          currency,
          value,
        }));

        console.log("normalizedRates: ", normalizedRates); // [{"currency": "EUR","value": 0.85516},{"currency": "RUB","value": 74.896461}s]
        console.log("response data: ", response.data); // {"success": true,"timeseries": true,"start_date": "2026-04-30","end_date": "2026-04-30","base": "USD","rates": {"2026-04-30": {"EUR": 0.85516,"RUB": 74.896461}}}
        setExchangeRates(normalizedRates);
        setCurrentDate(response?.data?.end_date);
      } catch (err) {
        console.warn("API failed, fallback to DB", err);

        try {
          const fallback = await axiosInstance.get(
            API_PATHS.USERS.GET_EXCHANGE_RATES(
              user.currency_code,
              targetCurrencies,
            ),
          );

          setExchangeRates(fallback?.data);
          console.log("fallback response: ", fallback?.data);
          setCurrentDate(
            dayjs(fallback?.data?.[0]?.date ?? "").format("YYYY-MM-DD"),
          );
        } catch (fallbackError) {
          console.error("Fallback also failed", fallbackError);
        }
      }
    };

    getExchangeRates();
  }, []);

  return (
    <div className="m-5">
      <h2 className="mb-5 text-center font-bold">Currencies And News Page</h2>

      <ul className="grid gap-4">
        {exchangeRates?.map((rate) => (
          <li key={rate.currency}>
            <ExchangeRateCard rate={rate} date={currentDate} />
          </li>
        ))}
      </ul>
    </div>
  );
}
