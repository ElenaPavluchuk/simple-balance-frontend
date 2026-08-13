import ArrowTrendIcon from "../Icons/ArrowTrendIcon";
import TrashIcon from "../Icons/TrashIcon";
import PencilIcon from "../Icons/PencilIcon";
import dayjs from "dayjs";
import Button from "../Button";
import { currencyFormat } from "../../utils/format";
import PropTypes from "prop-types";

TransactionCard.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    category_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    note: PropTypes.string,
    currency_code: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isDashboardStyle: PropTypes.bool,
  isDeleteLoading: PropTypes.bool.isRequired,
};

export default function TransactionCard({
  transaction,
  onDelete,
  onEdit,
  isDashboardStyle,
  isDeleteLoading,
}) {
  return (
    <div
      className={`flex ${isDashboardStyle ? "gap-3 items-center" : "gap-6 lg:gap-5"}`}
    >
      {isDashboardStyle && (
        <div
          className={`min-w-8 min-h-8 md:w-11 md:h-10 rounded-full flex items-center justify-center text-white ${transaction?.type === "INCOME" ? "bg-linear-to-r from-emerald-400 to-lime-600" : "bg-linear-to-r from-emerald-400 to-sky-600"}`}
        >
          {
            <ArrowTrendIcon
              className={`${transaction?.type === "INCOME" ? "rotate-180" : "rotate-0"}`}
            />
          }
        </div>
      )}
      <div
        className={`w-full flex flex-col gap-3 ${isDashboardStyle && "border-b border-gray-200 pb-2"}`}
      >
        <div className="flex justify-between items-center text-base md:text-lg text-cyan-950">
          <p>{transaction?.title}</p>
          <p className="font-medium">
            <span>{transaction?.type === "INCOME" ? "+" : "-"}</span>
            {currencyFormat(transaction?.amount, transaction?.currency_code)}
          </p>
        </div>

        <div className="flex justify-between items-center text-sm text-cyan-950">
          <span>
            <p>{transaction?.category_name}</p>
          </span>
          <p>{dayjs(transaction?.date).format("DD-MM-YYYY")}</p>
        </div>

        {!isDashboardStyle && (
          <p className="text-sm text-cyan-950 border-t border-gray-200 py-2">
            Note: <span>{transaction?.note}</span>
          </p>
        )}
      </div>

      {!isDashboardStyle && (
        <div className="flex flex-col items-center justify-between max-w-10">
          <Button onClick={() => onEdit(transaction)} variant="icon">
            <div className="border border-emerald-800 hover:bg-emerald-800 text-emerald-800 hover:text-white p-2 rounded-full">
              <PencilIcon className="w-5 h-5" />
            </div>
          </Button>

          <Button
            onClick={() => onDelete(transaction?.id)}
            disabled={isDeleteLoading}
            variant="icon"
          >
            <div className="border border-emerald-800 hover:bg-red-600 hover:border-red-600 text-emerald-800 hover:text-white p-2 rounded-full">
              <TrashIcon className="w-5 h-5" />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}
