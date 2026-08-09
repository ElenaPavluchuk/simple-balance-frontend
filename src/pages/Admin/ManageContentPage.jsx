import { useState, useEffect } from "react";
import CreateNewsForm from "../../shared/ui/ManageContent/CreateNewsForm";
import ExchangeRatesToggle from "../../shared/ui/ManageContent/ExchangeRatesToggle";
import ExchangeRatesByDateList from "../../shared/ui/ManageContent/ExchangeRatesByDateList";
import axiosInstance from "../../shared/utils/axiosInstance";
import { API_PATHS } from "../../shared/utils/apiPaths";
import toast, { Toaster } from "react-hot-toast";
import NewsList from "../../shared/ui/CurrenciesAndNews/NewsList";
import dayjs from "dayjs";
import { getErrorMessage } from "../../shared/utils/getErrorMessage";
import Loader from "../../shared/ui/Loader";
import ExchangeRateCard from "../../shared/ui/CurrenciesAndNews/ExchangeRateCard";
import Card from "../../shared/ui/Card";

export default function ManageContenPage() {
  const [news, setNews] = useState([]);
  const [rates, setRates] = useState([]);
  const [getRatesMessage, setGetRatesMessage] = useState("");
  const [baseCurrencyId, setBaseCurrencyId] = useState("");
  const [deleteRateDate, setDeleteRateDate] = useState(null);
  const [isGetNewsLoading, setIsGetNewsLoading] = useState(false);
  const [isCreateNewsLoading, setIsCreateNewsLoading] = useState(false);
  const [isDeleteNewsLoading, setIsDeleteNewsLoading] = useState(false);
  const [editNewsId, setEditNewsId] = useState(null);
  const [deleteNewsId, setDeleteNewsId] = useState(null);
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
      setDeleteNewsId(null);
      setNews((prevNews) =>
        prevNews.filter((news) => news.id !== parseFloat(response.data?.id)),
      );
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
        API_PATHS.ADMINS.NEWS_BY_ID(editNewsId),
        data,
      );

      setEditNewsId(null);
      setNews(
        news.map((item) => (item.id === editNewsId ? response.data : item)),
      );
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setIsUpdateNewsLoading(false);
    }
  };

  const handleCancelEdit = () => setEditNewsId(null);

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
      setGetRatesMessage(response.data?.message);
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

      toast.success(response.data?.message);
      setDeleteRateDate(null);
      setRates((prevRates) =>
        prevRates.filter(
          (rate) =>
            dayjs(rate.date).format("YYYY-MM-DD") !== response.data?.date,
        ),
      );
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setIsDeleteRateLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl text-emerald-800">Manage content</h2>
      <p className="text-xs md:text-sm text-cyan-900 mt-1">
        Admin tool for publishing and updating currency exchange rates and news
      </p>
      <div className="grid grid-cols-2 gap-5 mt-6">
        <div className="grid-1">
          <CreateNewsForm
            isCreateLoading={isCreateNewsLoading}
            onSave={handleAddNews}
          />
        </div>

        <div className="grid-1">
          <ExchangeRatesToggle
            onGetRates={handleGetRatesByBaseCurrency}
            onCreateRates={handleCreateRate}
            isCreateLoading={isCreateRateLoading}
            isGetLoading={isGetRateLoading}
          />
        </div>

        <div className="grid-1">
          <p className="text-xl text-slate-900 font-medium">Our news</p>
          {isGetNewsLoading && (
            <div className="mt-3 min-h-50 flex items-center justify-center">
              <Loader />
            </div>
          )}

          {!isGetNewsLoading && news.length === 0 && (
            <Card className="mt-3 min-h-50 flex items-center justify-center">
              <p className="text-sm text-cyan-950">No news yet</p>
            </Card>
          )}

          <ul className="grid gap-4 mt-3">
            {news.map((item) => (
              <NewsList
                key={item?.id}
                item={item}
                onDelete={handleDeleteNews}
                isEdit={editNewsId === item?.id}
                onEdit={setEditNewsId}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
                isDeleteNewsLoading={isDeleteNewsLoading}
                isUpdateNewsLoading={isUpdateNewsLoading}
                deleteNewsId={deleteNewsId}
                setDeleteNewsId={setDeleteNewsId}
              />
            ))}
          </ul>
        </div>

        <div className="grid-1">
          <p className="text-xl text-slate-900 font-medium">Our rates</p>
          {isGetRateLoading && (
            <div className="mt-3 min-h-50 flex items-center justify-center">
              <Loader />
            </div>
          )}

          {!isGetRateLoading && rates.length === 0 && (
            <Card className="mt-3 min-h-50 flex flex-col gap-2 items-center justify-center">
              <p className="text-sm text-cyan-950">
                Click "Get Rates" and get our rates
              </p>
              {getRatesMessage && (
                <p className="text-sm text-cyan-950 font-medium">
                  {getRatesMessage}
                </p>
              )}
            </Card>
          )}

          {rates.map((rate) => (
            <ExchangeRatesByDateList
              key={rate?.date}
              rate={rate}
              onDeleteRateByDate={handleDeleteRatesByDate}
              isDeleteRateLoading={isDeleteRateLoading}
              baseCurrencyId={baseCurrencyId}
              deleteRateDate={deleteRateDate}
              setDeleteRateDate={setDeleteRateDate}
            />
          ))}
        </div>
      </div>
    </>
  );
}
