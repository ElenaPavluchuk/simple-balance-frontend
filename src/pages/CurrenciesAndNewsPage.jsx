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
import Card from "../shared/ui/Card";

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
        console.warn("API failed, fallback to DB", err);

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
          console.error("Fallback also failed", fallbackError);
          setRatesApiError(
            getErrorMessage(
              fallbackError,
              "Sorry, rates are not available. Please try again later",
            ),
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
          getErrorMessage(
            err,
            "Sorry, news are not available. Please try again later",
          ),
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
        <p className="text-xs md:text-sm text-cyan-900 mt-1 text-balance">
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
            <Card className="min-h-90 flex items-center justify-center">
              <Loader />
            </Card>
          )}

          {ratesApiError && !isRatesLoading && (
            <Card className="min-h-90 flex items-center justify-center">
              <p className="text-base text-cyan-950 text-pretty">
                {ratesApiError}
              </p>
            </Card>
          )}

          {exchangeRates.length === 0 && !isRatesLoading && !ratesApiError && (
            <Card className="min-h-90 flex flex-col gap-4 items-center justify-center">
              <p className="text-lg text-cyan-950 text-pretty">
                Rates not added yet
              </p>
              {user?.user_role === "ADMIN" && (
                <span className="text-slate-800 font-medium text-lg text-balance">
                  You can adding exchange rates{" "}
                  <Link
                    className="text-lg text-gray-600 hover:underline whitespace-nowrap"
                    to="/manage-content"
                  >
                    here
                  </Link>
                </span>
              )}
            </Card>
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

        <div className="col-span-1 lg:col-span-2 lg:min-h-0">
          <h3 className="mb-5 text-xl text-slate-900 font-medium mt-4 lg:mt-0 lg:shrink-0">
            Our news
          </h3>

          <div className="lg:min-h-0 lg:max-h-192 xl:max-h-256 2xl:max-h-240 lg:overflow-y-auto lg:scroll-smooth">
            {isNewsLoading && (
              <Card className="min-h-90 flex items-center justify-center">
                <Loader />
              </Card>
            )}

            {newsApiError && !isNewsLoading && (
              <Card className="min-h-90 flex items-center justify-center">
                <p className="text-base text-cyan-950 text-pretty">
                  {newsApiError}
                </p>
              </Card>
            )}

            {news.length === 0 && !isNewsLoading && !newsApiError && (
              <Card className="min-h-90 flex flex-col gap-2 items-center justify-center">
                <p className="text-lg text-cyan-950 text-pretty">
                  News not added yet
                </p>
                {user?.user_role === "ADMIN" && (
                  <span className="text-slate-800 font-medium text-lg text-balance">
                    You can adding news{" "}
                    <Link
                      className="text-lg text-gray-600 hover:underline whitespace-nowrap"
                      to="/manage-content"
                    >
                      here
                    </Link>
                  </span>
                )}
              </Card>
            )}

            <div className="grid gap-4 mt-1">
              {news.map((item) => (
                <NewsList key={item?.id} item={item} isHideBtn />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
