export default function ExchangeRateCard({ rate, date }) {
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    RUB: "₽",
  };

  return (
    <div className="flex flex-col p-5 bg-white rounded-xl shadow-md border-l-4 border-[#ff8fab] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
      <div className="flex justify-between w-full">
        <span className="flex items-center gap-2">
          {currencySymbols[rate.target_code] || rate.target_code}
          <p className="text-lg font-semibold">{rate.target_code}</p>
        </span>
        <p className="font-bold text-green-700">{rate.rate}</p>
      </div>

      <div className="flex gap-2 justify-center items-center mt-3">
        <span className="text-xs text-italic text-gray-600">
          The rate is valid on the date:{" "}
        </span>
        <p className="text-sm text-gray-600">{date}</p>
      </div>
    </div>
  );
}
