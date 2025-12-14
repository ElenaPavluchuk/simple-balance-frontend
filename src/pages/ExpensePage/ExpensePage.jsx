import { useState } from "react";
import Button from "../../shared/ui/Button/Button";
import DialogModal from "../../shared/ui/DialogModal/DialogModal";
import AddTransCard from "../../shared/ui/AddTransCard/AddTransCard";
import { useSelector, useDispatch } from "react-redux";
import { deleteTransFromRedux } from "../../app/providers/redux/slices/transesSlice";
import { Trash2, Pencil } from "lucide-react";

export default function ExpensePage() {
  const [openAddTransModal, setOpenAddTransModal] = useState(false);
  const transes = useSelector((state) => state.transes.value);
  const dispatch = useDispatch();

  const deleteTrans = (id) => {
    dispatch(deleteTransFromRedux(id));
  };

  return (
    <div className="flex flex-col gap-20">
      <div>
        <Button onClick={() => setOpenAddTransModal(true)} variant="primary">
          Add Transaction
        </Button>
      </div>
      <DialogModal
        isOpen={openAddTransModal}
        onClose={() => setOpenAddTransModal(false)}
        title="Add transaction"
      >
        <AddTransCard onClose={() => setOpenAddTransModal(false)} />
      </DialogModal>

      <div className="min-w-xl mx-auto mt-6">
        <ul className="space-y-4">
          {transes
            .filter((trans) => trans.type === "expense")
            .map((trans) => (
              <li
                key={trans.id}
                className="bg-white flex flex-row justify-between gap-10 rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition"
              >
                <div className="w-full">
                  <div className="flex justify-between items-center ">
                    <p>{trans.name}</p>
                    <p>{trans.amount}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-500 ">
                    <span className="bg-gray-100 px-2 py-1 rounded-lg">
                      {trans.category}
                    </span>
                    <span>{trans.date}</span>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Button size={4}>
                    <Pencil className="text-gray-700" />
                  </Button>
                  <Button onClick={() => deleteTrans(trans.id)} size={4}>
                    <Trash2 className="text-gray-700" />
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
