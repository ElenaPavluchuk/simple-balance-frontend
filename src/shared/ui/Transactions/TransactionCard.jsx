import { Trash2, Pencil, MoveUpRight, MoveDownRight } from "lucide-react";
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
  dashboardStyle: PropTypes.bool,
  isDeleteLoading: PropTypes.bool.isRequired,
};

export default function TransactionCard({
  transaction,
  onDelete,
  onEdit,
  dashboardStyle,
  isDeleteLoading,
}) {
  return (
    <div
      className={`${dashboardStyle ? "flex gap-3 items-center" : "flex gap-2 bg-amber-100"}`}
    >
      {dashboardStyle && (
        <div
          className={`min-w-8 min-h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white ${transaction?.type === "INCOME" ? "bg-linear-to-r from-emerald-400 to-lime-600" : "bg-linear-to-r from-emerald-400 to-sky-600"}`}
        >
          {transaction?.type === "INCOME" ? <MoveUpRight /> : <MoveDownRight />}
        </div>
      )}
      <div
        className={`w-full flex flex-col ${dashboardStyle ? "gap-3 border-b border-gray-200 pb-2" : "gap-4"}`}
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

        {!dashboardStyle && (
          <p className="italic mt-4">
            Note: <span>{transaction?.note}</span>
          </p>
        )}
      </div>

      {!dashboardStyle && (
        <div className="flex flex-col items-center justify-between w-fit">
          <Button onClick={() => onEdit(transaction)} variant="icon">
            <Pencil className="text-gray-700" size={20} />
          </Button>
          <Button
            onClick={() => onDelete(transaction?.id)}
            disabled={isDeleteLoading}
            variant="icon"
          >
            <Trash2 className="text-gray-700" size={20} />
          </Button>
        </div>
      )}
    </div>
  );
}
