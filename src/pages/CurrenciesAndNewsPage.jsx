import { useState, useEffect } from "react";
import { useAuth } from "../shared/context/auth/useAuth";
import axios from "axios";
import dayjs from "dayjs";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import ExchangeRateCard from "../shared/ui/CurrenciesAndNews/ExchangeRateCard";
import { Link } from "react-router";
import NewsList from "../shared/ui/CurrenciesAndNews/NewsList";
import { getErrorMessage } from "../shared/utils/getErrorMessage";
import Loader from "../shared/ui/Loader";

export default function CurrenciesAndNewsPage() {
  const [news, setNews] = useState([]);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [isRatesLoading, setIsRatesLoading] = useState(false);
  const [isNewsLoading, setIsNewsLoading] = useState(false);
  const [ratesApiError, setRatesApiError] = useState("");
  const [newsApiError, setNewsApiError] = useState("");
  const { user } = useAuth();

  const targetCurrencies = ["USD", "RUB", "EUR"]
    .filter((currency) => currency !== user?.currency_code)
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
          setRatesApiError(
            "Sorry, rates are not available. Please try again later",
          );
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
    let isCancelled = false;

    const getNews = async () => {
      setIsNewsLoading(true);

      try {
        const response = await axiosInstance.get(API_PATHS.USERS.GET_NEWS);

        if (isCancelled) return;

        setNews(response.data ?? []);
      } catch (err) {
        if (isCancelled) return;
        console.error(err);
        setNewsApiError(
          "Sorry, news are not available. Please try again later",
        );
      } finally {
        setIsNewsLoading(false);
      }
    };

    getNews();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl text-emerald-800">Currencies & News</h2>
        <p className="text-xs md:text-sm text-cyan-900 mt-1">
          Stay informed with currency exchange rates and our latest updates
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="col-span-1 h-fit space-y-4">
          <h3 className="text-xl text-slate-900 font-medium">
            Exchange rates{" "}
            <span className="text-gray-500 text-xs ml-1">
              from {user?.currency_code}
            </span>
          </h3>

          {isRatesLoading && (
            <div className="w-full min-h-125 flex items-center justify-center">
              <Loader />
            </div>
          )}

          {ratesApiError && !isRatesLoading && (
            <div className="w-full min-h-125 flex items-center justify-center border border-dashed rounded">
              <p className="italic">{ratesApiError}</p>
            </div>
          )}

          {exchangeRates.length === 0 && !isRatesLoading && !ratesApiError && (
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

          <ul className="grid gap-4 mt-5">
            {exchangeRates.map((rate) => (
              <li key={rate?.target_code}>
                <ExchangeRateCard
                  rate={rate}
                  date={currentDate}
                  baseCurrencyCode={user?.currency_code}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 lg:col-span-2 space-y-6">
          <h3 className="text-xl text-slate-900 font-medium">Our news:</h3>

          {isNewsLoading && (
            <div className="w-full min-h-125 flex items-center justify-center">
              <Loader />
            </div>
          )}

          {newsApiError && !isNewsLoading && (
            <div className="w-full min-h-125 flex items-center justify-center border border-dashed rounded">
              <p className="italic">{newsApiError}</p>
            </div>
          )}

          {news.length === 0 && !isNewsLoading && !newsApiError && (
            <div className="w-full min-h-125 flex flex-col gap-5 items-center justify-center border border-dashed rounded">
              <p className="italic">News not added yet</p>
              {user?.user_role === "ADMIN" && (
                <span>
                  You can adding news{" "}
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

          <ul className="grid gap-4 mt-5">
            {news.map((item) => (
              <NewsList key={item?.id} item={item} hideBtn />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
