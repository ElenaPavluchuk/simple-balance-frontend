import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import dayjs from "dayjs";
import { getErrorMessage } from "../shared/utils/getErrorMessage";
import toast from "react-hot-toast";
import Loader from "../shared/ui/Loader";
import Card from "../shared/ui/Card";

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
      <Card className="min-h-90 flex justify-center items-center">
        <p className="text-lg font-medium text-cyan-950 text-pretty">
          News not found
        </p>
      </Card>
    );
  }

  return (
    <Card className="gap-5 flex flex-col">
      <h3 className="text-xl text-slate-900 font-medium text-balance">
        {selectedNews?.title}
      </h3>

      <p className="text-base text-cyan-950 text-pretty">
        {selectedNews?.content}
      </p>

      <p className="text-sm font-medium text-cyan-950 text-pretty">
        <span className="font-normal">Published at: </span>
        {dayjs(selectedNews?.published_at).format("DD-MM-YY")}
      </p>
    </Card>
  );
}
