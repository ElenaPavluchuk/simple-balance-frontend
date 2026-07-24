import AnimatedLineChart from "../../auth/AnimatedLineChart";
import authImg from "../../assets/authImg.png";

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="110"
              height="110"
              viewBox="0 0 66 66"
            >
              <g className="animate-spin [animation-duration:6s] [transform-origin:33px_33px]">
                <path
                  d="M59.2 14.7c-.3-.4-.9-.6-1.4-.3s-.6.9-.3 1.4c3.5 5 5.4 11 5.4 17.1 0 16.5-13.5 30-30 30-6.2 0-12.1-1.9-17.1-5.4-.5-.3-1.1-.2-1.4.2-.3.5-.2 1.1.3 1.4C20.1 63 26.4 65 33 65c17.6 0 32-14.3 32-32 0-6.6-2-12.9-5.8-18.3"
                  fill="#00684A"
                />

                <path
                  d="M3 33C3 16.5 16.5 3 33 3c5.5 0 10.8 1.5 15.5 4.3l-3.8 1.2c-.5.2-.8.7-.6 1.3.2.5.7.8 1.3.6L51 8.6c.7-.2.9-1 .6-1.5L50 1.9c-.2-.5-.7-.8-1.3-.7-.5.2-.8.8-.7 1.3l.9 2.8C44.1 2.5 38.6 1 33 1 15.4 1 1 15.4 1 33c0 6.6 2 12.9 5.8 18.3.3.5.9.6 1.4.2.5-.3.6-.9.2-1.4C4.9 45.1 3 39.2 3 33"
                  fill="#00684A"
                />
              </g>
              <g>
                <path
                  d="M33 56.8c13.1 0 23.8-10.7 23.8-23.8S46.1 9.3 33 9.3 9.2 19.9 9.2 33 19.9 56.8 33 56.8m-7.3-29.5c0-3.4 2.2-6.1 6-6.4v-1.6H34v1.6c3.4.4 5.4 2.4 5.9 5.5l-4 .5c-.2-1.3-.9-2.1-1.9-2.5v6.2c4 1.1 6.6 2.7 6.6 6.9 0 3.7-2.3 6.7-6.6 7.3v3h-2.3v-2.9c-3.6-.4-6-2.6-6.7-6.9l4.2-.4c.3 1.7 1.4 3 2.5 3.5v-6.7c-3.7-1.1-6-3.3-6-7.1"
                  fill="#00684A"
                />

                <path
                  d="M36.7 38.1c0-1.7-1.1-2.6-2.7-3v6.2c1.6-.3 2.7-1.6 2.7-3.2M31.7 24.3c-1.3.4-2.1 1.6-2.1 2.8 0 1.1.6 2.1 2.1 2.7z"
                  fill="#00684A"
                />
              </g>
            </svg>
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
