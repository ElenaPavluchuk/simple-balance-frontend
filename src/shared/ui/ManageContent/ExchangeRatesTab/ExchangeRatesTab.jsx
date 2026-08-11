import ExchangeRatesToggle from "./ExchangeRatesToggle";
import Loader from "../../Loader";
import Card from "../../Card";
import ExchangeRatesByDateList from "./ExchangeRatesByDateList";
import PropTypes from "prop-types";

ExchangeRatesTab.propTypes = {
  handleGetRatesByBaseCurrency: PropTypes.func.isRequired,
  handleCreateRate: PropTypes.func.isRequired,
  isCreateRateLoading: PropTypes.bool.isRequired,
  isGetRateLoading: PropTypes.bool.isRequired,
  rates: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      rates: PropTypes.objectOf(PropTypes.number).isRequired,
    }),
  ).isRequired,
  handleDeleteRatesByDate: PropTypes.func.isRequired,
  isDeleteRateLoading: PropTypes.bool.isRequired,
  baseCurrencyId: PropTypes.string.isRequired,
  deleteRateDate: PropTypes.string,
  setDeleteRateDate: PropTypes.func.isRequired,
  getRatesMessage: PropTypes.string,
};

export default function ExchangeRatesTab({
  handleGetRatesByBaseCurrency,
  handleCreateRate,
  isCreateRateLoading,
  isGetRateLoading,
  rates,
  handleDeleteRatesByDate,
  isDeleteRateLoading,
  baseCurrencyId,
  deleteRateDate,
  setDeleteRateDate,
  getRatesMessage,
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-5">
      <div className="flex-1">
        <ExchangeRatesToggle
          onGetRates={handleGetRatesByBaseCurrency}
          onCreateRates={handleCreateRate}
          isCreateLoading={isCreateRateLoading}
          isGetLoading={isGetRateLoading}
        />
      </div>

      <div className="flex-1">
        <p className="text-xl text-slate-900 font-medium">Our rates</p>
        {isGetRateLoading && (
          <div className="mt-3 min-h-50 flex items-center justify-center">
            <Loader />
          </div>
        )}

        {!isGetRateLoading && rates.length === 0 && (
          <Card className="mt-3 min-h-50 flex flex-col gap-2 items-center justify-center">
            <p className="text-sm text-cyan-950">
              Click "Get Rates" and get our rates
            </p>
            {getRatesMessage && (
              <p className="text-sm text-cyan-950 font-medium">
                {getRatesMessage}
              </p>
            )}
          </Card>
        )}

        {rates.map((rate) => (
          <ExchangeRatesByDateList
            key={rate?.date}
            rate={rate}
            onDeleteRateByDate={handleDeleteRatesByDate}
            isDeleteRateLoading={isDeleteRateLoading}
            baseCurrencyId={baseCurrencyId}
            deleteRateDate={deleteRateDate}
            setDeleteRateDate={setDeleteRateDate}
          />
        ))}
      </div>
    </div>
  );
}
