import { useState, useEffect } from "react";
import CreateNewsForm from "../../shared/ui/ManageContent/CreateNewsForm";
import ExchangeRatesToggle from "../../shared/ui/ManageContent/ExchangeRatesToggle";
import axiosInstance from "../../shared/utils/axiosInstance";
import { API_PATHS } from "../../shared/utils/apiPaths";
import toast, { Toaster } from "react-hot-toast";
import NewsList from "../../shared/ui/CurrenciesAndNews/NewsList";
import dayjs from "dayjs";
import { getErrorMessage } from "../../shared/utils/getErrorMessage";
import Loader from "../../shared/ui/Loader";
import ExchangeRateCard from "../../shared/ui/CurrenciesAndNews/ExchangeRateCard";

export default function ManageContenPage() {
  const [news, setNews] = useState([]);
  const [rates, setRates] = useState([]);
  const [baseCurrencyId, setBaseCurrencyId] = useState("");
  const [isGetNewsLoading, setIsGetNewsLoading] = useState(false);
  const [isCreateNewsLoading, setIsCreateNewsLoading] = useState(false);
  const [isDeleteNewsLoading, setIsDeleteNewsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUpdateNewsLoading, setIsUpdateNewsLoading] = useState(false);
  const [isCreateRateLoading, setIsCreateRateLoading] = useState(false);
  const [isGetRateLoading, setIsGetRateLoading] = useState(false);
  const [isDeleteRateLoading, setIsDeleteRateLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const getNews = async () => {
      setIsGetNewsLoading(true);

      try {
        const response = await axiosInstance.get(API_PATHS.USERS.GET_NEWS);

        if (isCancelled) return;

        setNews(response.data ?? []);
      } catch (err) {
        if (isCancelled) return;
        console.error(err);
        toast.error(getErrorMessage(err));
      } finally {
        if (!isCancelled) setIsGetNewsLoading(false);
      }
    };

    getNews();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleAddNews = async (data) => {
    setIsCreateNewsLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.ADMINS.ADD_NEWS,
        data,
      );

      setNews(
        [...news, response.data].sort((a, b) => (b.id || 0) - (a.id || 0)),
      );
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setIsCreateNewsLoading(false);
    }
  };

  const handleDeleteNews = async (id) => {
    setIsDeleteNewsLoading(true);

    try {
      const response = await axiosInstance.delete(
        API_PATHS.ADMINS.NEWS_BY_ID(id),
      );

      toast.success(response.data?.message);
      setNews(news.filter((news) => news.id !== parseFloat(response.data?.id)));
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setIsDeleteNewsLoading(false);
    }
  };

  const handleSaveEdit = async (data) => {
    setIsUpdateNewsLoading(true);

    try {
      const response = await axiosInstance.put(
        API_PATHS.ADMINS.NEWS_BY_ID(editingId),
        data,
      );

      setEditingId(null);
      setNews(
        news.map((item) => (item.id === editingId ? response?.data : item)),
      );
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setIsUpdateNewsLoading(false);
    }
  };

  const handleCancelEdit = () => setEditingId(null);

  const handleCreateRate = async (data) => {
    setIsCreateRateLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.ADMINS.ADD_EXCHANGE_RATES,
        data,
      );

      toast.success(response.data?.message);
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setIsCreateRateLoading(false);
    }
  };

  const handleGetRatesByBaseCurrency = async (selectedBaseCurrency) => {
    if (!selectedBaseCurrency) return;

    setIsGetRateLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.ADMINS.GET_EXCHANGE_RATES_BY_BASE_ID(
          selectedBaseCurrency.value,
        ),
      );

      setRates(response.data?.rates);
      setBaseCurrencyId(response.data?.base_currency_id);
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setIsGetRateLoading(false);
    }
  };

  const handleDeleteRatesByDate = async (date) => {
    if (!date) return;

    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    setIsDeleteRateLoading(true);

    try {
      const response = await axiosInstance.delete(
        API_PATHS.ADMINS.DELETE_EXCHANGE_RATES_BY_DATE(
          baseCurrencyId,
          formattedDate,
        ),
      );

      setRates(
        rates.filter(
          (rate) =>
            dayjs(rate.date).format("YYYY-MM-DD") !== response.data?.date,
        ),
      );

      toast.success(response.data?.message);
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setIsDeleteRateLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="grid-1">
        <CreateNewsForm
          isCreateLoading={isCreateNewsLoading}
          onSave={handleAddNews}
        />
      </div>

      <div className="bg-rose-200 grid-1">
        <ExchangeRatesToggle
          onGetRates={handleGetRatesByBaseCurrency}
          onCreateRates={handleCreateRate}
          isCreateLoading={isCreateRateLoading}
          isGetLoading={isGetRateLoading}
        />
      </div>

      <div className="grid-1">
        <p>Our news: </p>
        {isGetNewsLoading && (
          <div className="mt-2 h-125 flex items-center justify-center">
            <Loader />
          </div>
        )}

        {!isGetNewsLoading && news.length === 0 && (
          <div className="mt-2 h-125 flex items-center justify-center border rounded border-dashed p-2">
            <p className="italic">No news yet...</p>
          </div>
        )}

        <ul className="grid gap-4 mt-5">
          {news.map((item) => (
            <NewsList
              key={item?.id}
              item={item}
              onDelete={handleDeleteNews}
              isEdit={editingId === item?.id}
              onEdit={setEditingId}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
              isDeleteNewsLoading={isDeleteNewsLoading}
              isUpdateNewsLoading={isUpdateNewsLoading}
            />
          ))}
        </ul>
      </div>

      <div className="grid-1">
        <p>Our rates: </p>
        {isGetRateLoading && (
          <div className="mt-2 h-125 flex items-center justify-center">
            <Loader />
          </div>
        )}

        {!isGetRateLoading && rates.length === 0 && (
          <div className="mt-2 h-125 flex items-center justify-center border rounded border-dashed p-2">
            <p className="italic">Click "Get Rates" and get actually rates</p>
          </div>
        )}

        {rates.map((rate) => (
          <div
            key={rate?.date}
            className="bg-white mt-5 mb-2 rounded px-4 py-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="flex justify-between mb-2">
              <p>{dayjs(rate?.date).format("DD-MM-YYYY")}</p>
              <button
                onClick={() => handleDeleteRatesByDate(rate?.date)}
                disabled={isDeleteRateLoading}
                className="italic underline"
              >
                {isDeleteRateLoading ? "Loading..." : "Delete"}
              </button>
            </div>

            {rate?.rates.map((r) => (
              <ExchangeRateCard
                key={r?.id}
                rate={r}
                selectedCurrencyId={baseCurrencyId}
                isManagedCardStyle
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
