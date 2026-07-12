import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import dayjs from "dayjs";
import { getErrorMessage } from "../shared/utils/getErrorMessage";
import toast from "react-hot-toast";
import Loader from "../shared/ui/Loader";

export default function NewsPage() {
  const { id } = useParams();
  const [selectedNews, setSelectedNews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const getNewsById = async () => {
      setIsLoading(true);

      try {
        const response = await axiosInstance.get(
          API_PATHS.USERS.NEWS_BY_ID(id),
        );

        if (isCancelled) return;

        setSelectedNews(response.data ?? null);
      } catch (err) {
        if (isCancelled) return;
        console.error(err);
        toast.error(getErrorMessage(err));
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    getNewsById();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader />
      </div>
    );
  }

  if (!selectedNews && !isLoading) {
    return (
      <div>
        <p className="mt-4 bg-white flex flex-col gap-3 p-6 rounded-2xl shadow-md border-l-4 border-rose-300 transition-all duration-300 hover:shadow-lg hover:translate-y-0.5">
          News not found
        </p>
      </div>
    );
  }

  return (
    <>
      <h3 className="font-semibold">{selectedNews?.title}</h3>
      <div className="mt-4 bg-white flex flex-col gap-3 p-6 rounded-2xl shadow-md border-l-4 border-rose-300 transition-all duration-300 hover:shadow-lg hover:translate-y-0.5">
        <p>{selectedNews?.content}</p>
        <p className="italic mt-4">
          {dayjs(selectedNews?.published_at).format("DD-MM-YY")}
        </p>
      </div>
    </>
  );
}
