import AnimatedLineChart from "../../auth/AnimatedLineChart";
import InfoCard from "../../auth/InfoCard";
import { Activity } from "lucide-react";
import authImg from "../../assets/authImg.png";

export default function AuthLayout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <h2 className="text-lg font-medium text-black">Simple Balance</h2>
        {children}
      </div>

      <div className="hidden md:flex flex-1 w-[40vw] h-screen bg-linear-to-r from-emerald-900 from-10% via-emerald-700 via-50% to-emerald-400 to-90% overflow-hidden relative">
        <div className="w-48 h-48 rounded-[20px] bg-emerald-200 absolute -top-7 -left-5" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-lime-300 absolute top-[30%] -right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-emerald-200 absolute -bottom-7 -left-5" />

        <div className="absolute top-[2%] left-[35%] -translate-x-1/2 w-[65%] h-64 bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl shadow-[#ff8fab]/30 py-8 px-4 z-10 border border-[#ffb3c6]">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Ежемесячный поток
          </h3>
          <AnimatedLineChart />
        </div>

        <div className="absolute xl:bottom-0 bottom-25 left-1/2 -translate-x-1/2 w-full">
          {/* <div className="w-full h-full flex flex-col items-center justify-center"> */}
          <div className="w-full flex items-center justify-center relative">
            <img
              className="xl:size-140 size-110  object-bottom object-fill"
              src={authImg}
              alt="Image"
            />
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
