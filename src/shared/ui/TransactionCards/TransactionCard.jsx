// import PropTypes from "prop-types";
// import Button from "../Button/Button";
// import { Trash2, Pencil } from "lucide-react";

// TransCard.propTypes = {
//   trans: PropTypes.shape({
//     id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
//     name: PropTypes.string,
//     amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//     category: PropTypes.string,
//     date: PropTypes.string,
//   }).isRequired,
//   onEdit: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };
// { trans, onEdit, onDelete }
export default function TransactionCard({ transaction }) {
  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center ">
          <p>{transaction.title}</p>
          <p>{transaction.amount}</p>
        </div>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-500 ">
          <span className="bg-gray-100 px-2 py-1 rounded-lg">
            {transaction.category_id}
          </span>
          <span>{transaction.date}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start">
        {/* <Button onClick={() => onEdit(trans)} size={4}>
          <Pencil className="text-gray-700" />
        </Button>
        <Button onClick={() => onDelete(trans.id)} size={4}>
          <Trash2 className="text-gray-700" />
        </Button> */}
      </div>
    </>
  );
}
