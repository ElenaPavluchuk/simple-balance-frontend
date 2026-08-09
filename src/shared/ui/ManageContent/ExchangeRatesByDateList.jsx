import dayjs from "dayjs";
import Button from "../Button";
import ExchangeRateCard from "../CurrenciesAndNews/ExchangeRateCard";
import DialogModal from "../DialogModal";
import DeleteAlert from "../DeleteAlert";
import PropTypes from "prop-types";

ExchangeRatesByDateList.propTypes = {
  rate: PropTypes.shape({
    date: PropTypes.string.isRequired,
    rates: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        currency_id: PropTypes.number.isRequired,
        rate: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  onDeleteRateByDate: PropTypes.func.isRequired,
  isDeleteRateLoading: PropTypes.bool.isRequired,
  baseCurrencyId: PropTypes.string.isRequired,
  deleteRateDate: PropTypes.string,
  setDeleteRateDate: PropTypes.func.isRequired,
};

export default function ExchangeRatesByDateList({
  rate,
  onDeleteRateByDate,
  isDeleteRateLoading,
  baseCurrencyId,
  deleteRateDate,
  setDeleteRateDate,
}) {
  return (
    <div className="mt-3 mb-6">
      <div className="flex justify-between">
        <p className="text-slate-900 font-medium text-balance text-base">
          {dayjs(rate?.date).format("DD-MM-YYYY")}
        </p>

        <Button
          onClick={() => setDeleteRateDate(rate?.date)}
          disabled={isDeleteRateLoading}
          variant="link"
          className="max-w-14"
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

      <DialogModal
        isOpen={deleteRateDate === rate?.date}
        onClose={() => setDeleteRateDate(null)}
        title="Delete rate"
      >
        <DeleteAlert
          message="Are you sure you want to delete rate?"
          onDelete={() => onDeleteRateByDate(rate?.date)}
          onClose={() => setDeleteRateDate(null)}
          isLoading={isDeleteRateLoading}
        />
      </DialogModal>
    </div>
  );
}
