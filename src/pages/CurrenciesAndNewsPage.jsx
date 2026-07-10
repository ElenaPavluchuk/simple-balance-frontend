import { useState, useEffect } from "react";
import { useAuth } from "../shared/context/auth/useAuth";
import axios from "axios";
import dayjs from "dayjs";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import ExchangeRateCard from "../shared/ui/CurrenciesAndNews/ExchangeRateCard";
import { Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import NewsList from "../shared/ui/CurrenciesAndNews/NewsList";
import { getErrorMessage } from "../shared/utils/getErrorMessage";
import Loader from "../shared/ui/Loader";

export default function CurrenciesAndNewsPage() {
  const [news, setNews] = useState([]);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [isRatesLoading, setIsRatesLoading] = useState(false);
  const [isNewsLoading, setIsNewsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const { user } = useAuth();

  const targetCurrencies = ["USD", "RUB", "EUR"]
    .filter((currency) => currency !== user.currency_code)
    .join(",");

  const today = dayjs().format("YYYY-MM-DD");

  const options = {
    method: "GET",
    url: "https://currency-conversion-and-exchange-rates.p.rapidapi.com/timeseries",
    params: {
      start_date: today,
      end_date: today,
      base: user?.currency_code,
      symbols: targetCurrencies,
    },
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host":
        "currency-conversion-and-exchange-rates.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    let isCancelled = false;

    const getExchangeRates = async () => {
      setIsRatesLoading(true);

      try {
        const response = await axios.request(options);

        if (isCancelled) return;

        const normalizedRates = Object.entries(response.data?.rates[today]).map(
          ([target_code, rate]) => ({
            target_code,
            rate,
          }),
        );

        setExchangeRates(normalizedRates ?? []);
        setCurrentDate(
          dayjs(response.data?.end_date ?? "").format("DD-MM-YYYY"),
        );
        setIsRatesLoading(false);
      } catch (err) {
        if (isCancelled) return;
        console.warn(getErrorMessage(err, "API failed, fallback to DB"));

        setIsRatesLoading(true);

        try {
          const fallback = await axiosInstance.get(
            API_PATHS.USERS.GET_EXCHANGE_RATES,
          );

          if (isCancelled) return;

          setExchangeRates(fallback.data?.rates ?? []);
          setCurrentDate(dayjs(fallback.data?.date ?? "").format("DD-MM-YYYY"));
        } catch (fallbackError) {
          if (isCancelled) return;
          console.error(getErrorMessage(fallbackError, "Fallback also failed"));
          setApiError("Sorry, rates are not available. Please try again later");
        } finally {
          setIsRatesLoading(false);
        }
      }
    };

    getExchangeRates();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    const getNews = async () => {
      try {
        setIsNewsLoading(true);

        const response = await axiosInstance.get(API_PATHS.USERS.GET_NEWS);

        setNews(response?.data);
      } catch (err) {
        console.error(err);
        toast.error(err?.response?.data?.message || "Something went wrong");
      } finally {
        setIsNewsLoading(false);
      }
    };

    getNews();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="p-5 rounded grid-1">
        <div className="flex flex-row items-center justify-between">
          <h3 className="font-semibold p-2">Exchange rates</h3>
          <p className="text-gray-700 italic">from {user?.currency_code}</p>
        </div>

        {isRatesLoading && (
          <div className="w-full min-h-125 flex items-center justify-center">
            <Loader />
          </div>
        )}

        {apiError && !isRatesLoading && (
          <div className="w-full min-h-125 flex items-center justify-center border border-dashed rounded">
            <p className="italic">{apiError}</p>
          </div>
        )}

        {exchangeRates.length === 0 && !isRatesLoading && !apiError && (
          <div className="w-full min-h-125 flex flex-col gap-5 items-center justify-center border border-dashed rounded">
            <p className="italic">Rates not added yet</p>
            {user?.user_role === "ADMIN" && (
              <span>
                You can adding exchange rates{" "}
                <Link
                  className="font-semibold underline italic"
                  to="/manage-content"
                >
                  here
                </Link>
              </span>
            )}
          </div>
        )}

        <ul className="grid gap-4">
          {exchangeRates.map((rate) => (
            <li key={rate?.target_code}>
              <ExchangeRateCard rate={rate} date={currentDate} />
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-cyan-50 p-5 rounded grid-1">
        <p className="text-center font-semibold">Our news:</p>
        {/* {(isRatesLoading || isNewsLoading) && (
          <div className="w-md h-28 flex items-center justify-center">
            <p className="italic text-gray-400">Loading...</p>
          </div>
        )} */}
        <ul>
          {(news ?? []).map((item) => (
            <NewsList key={item?.id} item={item} hideBtn={true} />
          ))}
        </ul>
      </div>
    </div>
  );
}
