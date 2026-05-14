import { useState, useEffect } from "react";
import CreateNewsForm from "../shared/ui/CurrenciesAndNewsContent/CreateNewsForm";
import ExchangeRatesManager from "../shared/ui/CurrenciesAndNewsContent/ExchangeRatesManager";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import toast, { Toaster } from "react-hot-toast";
import NewsList from "../shared/ui/CurrenciesAndNewsContent/NewsList";

export default function ManageContenPage() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCreateNews = async (data) => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.ADMINS.ADD_NEWS,
        data,
      );

      setNews([...news, response?.data]);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-row items-start justify-around gap-4 p-4 mt-10">
      <div>
        <CreateNewsForm isLoading={isLoading} onSave={handleCreateNews} />

        <div className="mt-20 max-w-md">
          <p>Our news: </p>
          <ul>
            {(news ?? []).map((item) => (
              <NewsList key={item?.id} item={item} />
            ))}
          </ul>
        </div>
      </div>

      <ExchangeRatesManager />

      <div>
        <Toaster position="top-center" />
      </div>
    </div>
  );
}
