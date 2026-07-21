import AnimatedLineChart from "../../auth/AnimatedLineChart";
import { MoveDown } from "lucide-react";
import InfoCard from "../../auth/InfoCard";
// import authImg from "../../assets/authImg.svg";
import authImg from "../../assets/authImg.svg";

export default function AuthLayout({ children }) {
  return (
    <div className="flex">
      <div className="flex-1">
        {/* <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12"> */}
        <h2 className="text-lg font-medium text-black">Simple Balance</h2>
        {children}
      </div>

      <div className="flex-1 hidden md:block w-[40vw] h-screen bg-linear-to-r from-emerald-900 via-emerald-800 to-emerald-500 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        {/* <div className="hidden md:block w-[40vw] h-screen bg-[#ffe5ec] bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative"> */}
        {/* <div className="w-48 h-48 rounded-[40px] border-[20px] border-emerald-200 absolute -top-7 -left-5" /> */}
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-emerald-900 absolute top-[30%] -right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-emerald-300 absolute -bottom-7 -left-5 " />

        {/* <div className="grid grid-cols-1 z-20">
          <InfoCard
            icon={<MoveDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-[#e11d48]"
          />
        </div> */}

        <div className="absolute top-[5%] left-[38%] -translate-x-1/2 w-[65%] h-64 bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl shadow-[#ff8fab]/30 py-8 px-4 z-10 border border-[#ffb3c6]">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Track Your Income & Expenses
          </h3>
          <AnimatedLineChart />
        </div>

        <div className=" absolute bottom-0 left-1/2 -translate-x-1/2 min-w-100 lg:w-[90%] shadow-lg shadow-[#ff8fab]/15">
          {" "}
          {/* Увеличиваем w-80 lg:w-[90%] */}
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-full h-fit flex items-center justify-center relative scale-110 ">
              <img src={authImg} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
