import { useState } from "react";
import CreateNewsForm from "../shared/ui/ManageContent/CreateNewsForm";
import ExchangeRatesCard from "../shared/ui/ManageContent/ExchangeRatesCard";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import toast, { Toaster } from "react-hot-toast";

export default function ManageContenPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateNews = async (data) => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.ADMINS.ADD_NEWS,
        data,
      );

      console.log("add news response: ", response);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-row items-center justify-around gap-4 p-4">
      <CreateNewsForm isLoading={isLoading} onSave={handleCreateNews} />
      <ExchangeRatesCard />

      <div>
        <Toaster position="top-center" />
      </div>
    </div>
  );
}
