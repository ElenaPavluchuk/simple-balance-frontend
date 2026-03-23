// import PropTypes from "prop-types";
import TransactionCard from "../ui/TransactionCards/TransactionCard";
// import EditableTransCard from "../EditableTransCard/EditableTransCard";

// TransesList.propTypes = {
//   trans: PropTypes.shape({
//     id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
//     name: PropTypes.string,
//     amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//     category: PropTypes.string,
//     date: PropTypes.string,
//   }).isRequired,
//   editingTrans: PropTypes.shape({
//     id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//     name: PropTypes.string,
//     amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//     category: PropTypes.string,
//     date: PropTypes.string,
//   }),
//   category: PropTypes.array.isRequired,
//   onChangeEditInput: PropTypes.func.isRequired,
//   saveUpdateTrans: PropTypes.func.isRequired,
//   cancelUpdateTrans: PropTypes.func.isRequired,
//   onEdit: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

export default function TransactionsList({ transaction, onDelete }) {
  //{
  //trans,
  // editingTrans,
  // category,
  // onChangeEditInput,
  // saveUpdateTrans,
  // cancelUpdateTrans,
  // onEdit,
  // onDelete,
  //}
  // const isEditing = editingTrans?.id === trans.id;
  return (
    // <li className="bg-white flex flex-row justify-between gap-10 rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
    //   {isEditing ? (
    //     <EditableTransCard
    //       editingTrans={editingTrans}
    //       onChangeEditInput={onChangeEditInput}
    //       category={category}
    //       saveUpdateTrans={saveUpdateTrans}
    //       cancelUpdateTrans={cancelUpdateTrans}
    //     />
    //   ) : (
    //     <TransCard trans={trans} onEdit={onEdit} onDelete={onDelete} />
    //   )}
    // </li>
    <li className="bg-white flex flex-row justify-between gap-10 rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
      {
        <TransactionCard
          transaction={transaction}
          // onEdit={onEdit}
          onDelete={onDelete}
        />
      }
    </li>
  );
}
