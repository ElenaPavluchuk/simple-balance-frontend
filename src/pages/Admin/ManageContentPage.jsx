import { useState, useEffect } from "react";
import CreateNewsForm from "../../shared/ui/ManageContent/CreateNewsForm";
import ExchangeRatesToggle from "../../shared/ui/ManageContent/ExchangeRatesToggle";
import axiosInstance from "../../shared/utils/axiosInstance";
import { API_PATHS } from "../../shared/utils/apiPaths";
import toast, { Toaster } from "react-hot-toast";
import NewsList from "../../shared/ui/CurrenciesAndNews/NewsList";
import dayjs from "dayjs";

export default function ManageContenPage() {
  const [news, setNews] = useState([]);
  const [rates, setRates] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        setIsLoading(true);

        const response = await axiosInstance.get(API_PATHS.USERS.GET_NEWS);

        setNews(response?.data);
      } catch (err) {
        console.error(err);
        toast.error(err?.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    getNews();
  }, []);

  const handleAddNews = async (data) => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.ADMINS.ADD_NEWS,
        data,
      );

      setNews(
        [...news, response?.data].sort((a, b) => (b.id || 0) - (a.id || 0)),
      );
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNews = async (id) => {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.ADMINS.NEWS_BY_ID(id),
      );

      toast.success(response?.data?.message);

      setNews(
        news.filter((news) => news.id !== parseFloat(response?.data?.id)),
      );
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  const handleSaveEdit = async (data) => {
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
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  const handleCancelEdit = () => setEditingId(null);

  // rates
  const getRatesByBaseCurrency = async (selectedBaseCurrency) => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.ADMINS.GET_EXCHANGE_RATES_BY_BASE_ID(
          selectedBaseCurrency.value,
        ),
      );

      setRates(response.data?.rates);
      setBaseCurrency(response.data?.base_currency_id);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRatesByDate = async (date) => {
    if (!date) return;

    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    try {
      const response = await axiosInstance.delete(
        API_PATHS.ADMINS.DELETE_EXCHANGE_RATES_BY_DATE(
          baseCurrency,
          formattedDate,
        ),
      );

      setRates(
        rates.filter(
          (rate) =>
            dayjs(rate.date).format("YYYY-MM-DD") !== response?.data?.date,
        ),
      );

      toast.success(response?.data?.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="bg-teal-200 grid-1">
        <CreateNewsForm isLoading={isLoading} onSave={handleAddNews} />
      </div>

      <div className="bg-rose-200 grid-1">
        <ExchangeRatesToggle onGetRates={getRatesByBaseCurrency} />
      </div>

      <div className="grid-1">
        <p>Our news: </p>
        <ul>
          {(news ?? []).map((item) => (
            <NewsList
              key={item?.id}
              item={item}
              onDelete={handleDeleteNews}
              isEdit={editingId === item.id}
              onEdit={setEditingId}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          ))}
        </ul>
      </div>

      <div className="grid-1">
        {rates.length > 0 && <p>Our rates: </p>}
        {rates.map((rate) => (
          <div key={rate.date} className="bg-white mb-2 rounded">
            <div className="flex justify-between">
              <p>{dayjs(rate.date).format("DD-MM-YYYY")}</p>
              <button
                onClick={() => deleteRatesByDate(rate.date)}
                className="italic underline"
              >
                Delete
              </button>
            </div>

            {rate.rates.map((r) => (
              <div key={r.id} className="flex justify-around border p-3">
                <p>
                  <span>{r.target_symbol}</span>
                  {r.target_code}
                </p>
                <p>{r.rate}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
