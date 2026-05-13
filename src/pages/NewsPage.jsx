import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import dayjs from "dayjs";

export default function NewsPage() {
  const { id } = useParams();
  const [selectedNews, setSelectedNews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getNewsById = async () => {
      try {
        setIsLoading(true);

        const response = await axiosInstance.get(
          API_PATHS.USERS.NEWS_BY_ID(id),
        );

        setSelectedNews(response?.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getNewsById();
  }, [id]);

  return (
    <div className="m-10">
      <h3 className="font-semibold">News Page</h3>
      <div className="flex flex-col gap-5 mt-8">
        <p className="font-semibold">{selectedNews?.title}</p>
        <p>{selectedNews?.content}</p>
        <p className="italic">
          {dayjs(selectedNews?.published_at).format("DD-MM-YY")}
        </p>
      </div>

      {isLoading && (
        <div className="w-md h-28 flex items-center justify-center">
          <p className="italic text-gray-400">Loading...</p>
        </div>
      )}
    </div>
  );
}
