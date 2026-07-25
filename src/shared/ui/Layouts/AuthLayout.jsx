import AnimatedLineChart from "../Auth/AnimatedLineChart";
import authImg from "../../assets/authImg.png";
import DollarIcon from "../Icons/DollarIcon";

export default function AuthLayout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="flex-1">
        {/* TODO: add logo */}
        <h2 className="text-lg font-medium text-black">Simple Balance</h2>
        {children}
      </div>

      <div className="hidden md:flex lg:flex-1 md:flex-1/6 h-screen bg-linear-to-r from-emerald-900 from-10% via-emerald-700 via-50% to-emerald-400 to-90% overflow-hidden relative">
        <div className="w-48 h-56 rounded-[40px] border-20 border-lime-300 absolute top-[30%] -right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-emerald-200 absolute -bottom-7 -left-5">
          <div className="w-48 h-48 flex items-center justify-center">
            <DollarIcon />
          </div>
        </div>

        <div className="absolute top-[2%] left-[36%] -translate-x-1/2 w-[65%] h-64 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl shadow-emerald-500 py-8 px-4 z-10 border border-emerald-700">
          <h3 className="text-lg font-medium text-emerald-700">
            Keep Tabs on Your Money
          </h3>
          <AnimatedLineChart />
        </div>

        <div className="absolute xl:bottom-0 bottom-20 left-1/2 -translate-x-1/2 w-full">
          <div className="w-full flex items-center justify-center relative">
            <img
              className="xl:size-150 size-120 object-bottom object-fill"
              src={authImg}
              alt="Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
