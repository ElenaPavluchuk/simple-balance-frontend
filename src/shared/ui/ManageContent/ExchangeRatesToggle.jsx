import { useState } from "react";
import CreateExchangeRateForm from "./CreateExchangeRateForm";
import GetRatesByBaseCurrencyCard from "./GetRatesByBaseCurrencyCard";
import PropTypes from "prop-types";

ExchangeRatesToggle.propTypes = {
  onGetRates: PropTypes.func.isRequired,
  onCreateRates: PropTypes.func.isRequired,
  isCreateLoading: PropTypes.bool.isRequired,
  isGetLoading: PropTypes.bool.isRequired,
};

const CARD_TYPES = {
  ADD: "ADD",
  GET: "GET",
};

export default function ExchangeRatesToggle({
  onGetRates,
  onCreateRates,
  isCreateLoading,
  isGetLoading,
}) {
  const [type, setType] = useState(CARD_TYPES.ADD);

  return (
    <div className="w-full h-full bg-white p-6 rounded shadow">
      <p className="text-center font-semibold my-3">Exchange Rates</p>
      <div className="flex justify-center gap-4 mb-6">
        {[
          { LABEL: "Add rates", VALUE: CARD_TYPES.ADD },
          { LABEL: "Get rates", VALUE: CARD_TYPES.GET },
        ].map((item) => (
          <label key={item.VALUE} className="flex items-center cursor-pointer">
            <input
              type="radio"
              value={item.VALUE}
              checked={type === item.VALUE}
              onChange={(e) => setType(e.target.value)}
              className="hidden peer"
            />

            <span
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all
              ${
                type === item.VALUE
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.LABEL}
            </span>
          </label>
        ))}
      </div>

      {type === CARD_TYPES.ADD ? (
        <CreateExchangeRateForm
          onCreateRates={onCreateRates}
          isCreateLoading={isCreateLoading}
        />
      ) : (
        <GetRatesByBaseCurrencyCard
          onGetRates={onGetRates}
          isGetLoading={isGetLoading}
        />
      )}
    </div>
  );
}
