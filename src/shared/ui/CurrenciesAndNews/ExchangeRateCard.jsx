export default function ExchangeRateCard({ rate }) {
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    RUB: "₽",
  };

  return (
    <div className="flex justify-between p-5 bg-white rounded-xl shadow-md border-l-4 border-[#ff8fab] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
      <span className="flex items-center gap-2">
        {currencySymbols[rate.currency] || rate.currency}
        <p className="text-lg font-semibold">{rate.currency}</p>
      </span>
      <p className="text-gray-600">{rate.value}</p>
    </div>
  );
}
