import dayjs from "dayjs";
import Button from "../Button";
import ExchangeRateCard from "../CurrenciesAndNews/ExchangeRateCard";

export default function ExchangeRatesByDateList({
  rate,
  onDeleteRateByDate,
  isDeleteRateLoading,
  baseCurrencyId,
}) {
  return (
    <div className="mt-3 mb-6">
      <div className="flex justify-between">
        <p className="text-slate-900 font-medium text-balance text-base">
          {dayjs(rate?.date).format("DD-MM-YYYY")}
        </p>

        <Button
          onClick={() => onDeleteRateByDate(rate?.date)}
          disabled={isDeleteRateLoading}
          variant="link"
        >
          {isDeleteRateLoading ? "Loading..." : "Delete"}
        </Button>
      </div>

      {rate?.rates.map((r) => (
        <ExchangeRateCard
          key={r?.id}
          rate={r}
          selectedCurrencyId={baseCurrencyId}
          isManagedCardStyle
        />
      ))}
    </div>
  );
}
