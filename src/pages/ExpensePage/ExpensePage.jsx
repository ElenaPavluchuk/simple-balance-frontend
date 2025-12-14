import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../shared/ui/Button/Button";
import DialogModal from "../../shared/ui/DialogModal/DialogModal";
import AddTransCard from "../../shared/ui/AddTransCard/AddTransCard";

export default function ExpensePage() {
  const [openAddTransModal, setOpenAddTransModal] = useState(false);
  const transes = useSelector((state) => state.transes.value);

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

      <div className="min-w-2xl mx-auto mt-6">
        <ul className="space-y-4">
          {transes
            .filter((trans) => trans.type === "expense")
            .map((trans) => (
              <li
                key={trans.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition"
              >
                <div div className="flex justify-between items-center">
                  <p>{trans.name}</p>
                  <p>-{trans.amount}</p>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded-lg">
                    {trans.category}
                  </span>
                  <span>{trans.date}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
