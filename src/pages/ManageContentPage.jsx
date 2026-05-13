import { useState, useEffect } from "react";
import CreateNewsForm from "../shared/ui/ManageContent/CreateNewsForm";
import ExchangeRatesCard from "../shared/ui/ManageContent/ExchangeRatesCard";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";

export default function ManageContenPage() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getNews = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(API_PATHS.USERS.GET_NEWS);

        setNews(response?.data);
        setIsLoading(false);
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
      setIsLoading(false);
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
              <li key={item?.id}>
                <div className="bg-white p-3 shadow rounded mt-1 flex flex-col gap-3">
                  <p className="font-semibold">{item?.title}</p>
                  <p className="line-clamp-2">{item?.content}</p>
                  <p className="italic text-sm">
                    {dayjs(item?.published_at).format("DD-MM-YYYY")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ExchangeRatesCard />

      <div>
        <Toaster position="top-center" />
      </div>
    </div>
  );
}
