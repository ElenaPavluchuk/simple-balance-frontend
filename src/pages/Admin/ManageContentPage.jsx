import { useState, useEffect } from "react";
import CreateNewsForm from "../../shared/ui/ManageContent/CreateNewsForm";
import ExchangeRatesToggle from "../../shared/ui/ManageContent/ExchangeRatesToggle";
import axiosInstance from "../../shared/utils/axiosInstance";
import { API_PATHS } from "../../shared/utils/apiPaths";
import toast, { Toaster } from "react-hot-toast";
import NewsList from "../../shared/ui/CurrenciesAndNews/NewsList";

export default function ManageContenPage() {
  const [news, setNews] = useState([]);
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

  return (
    <div className="w-full h-full flex flex-row items-start justify-around gap-4 p-4 mt-10">
      <div>
        <CreateNewsForm isLoading={isLoading} onSave={handleAddNews} />

        <div className="mt-20 max-w-md">
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
      </div>

      <ExchangeRatesToggle />

      <div>
        <Toaster position="top-center" />
      </div>
    </div>
  );
}
