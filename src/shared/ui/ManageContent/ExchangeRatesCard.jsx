import { useState } from "react";
import CreateExchangeRateForm from "./CreateExchangeRateForm";
import GetRatesByBaseCurrencyCard from "./GetRatesByBaseCurrencyCard";

const cardTypes = {
  add: "add",
  get: "get",
};

export default function ExchangeRatesCard() {
  const [type, setType] = useState(cardTypes.get);
  return (
    <div className="max-w-md w-full bg-white p-6 rounded shadow">
      <p className="text-center font-semibold my-3">Exchange Rates</p>
      <div className="flex justify-center gap-4 mb-6">
        {[
          { label: "Get rates", value: cardTypes.get },
          { label: "Add rates", value: cardTypes.add },
        ].map((item) => (
          <label key={item.value} className="flex items-center cursor-pointer">
            <input
              type="radio"
              value={item.value}
              checked={type === item.value}
              onChange={(e) => setType(e.target.value)}
              className="hidden peer"
            />

            <span
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all
              ${
                type === item.value
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </span>
          </label>
        ))}
      </div>
      {type === cardTypes.add ? (
        <CreateExchangeRateForm />
      ) : (
        <GetRatesByBaseCurrencyCard />
      )}
    </div>
  );
}
