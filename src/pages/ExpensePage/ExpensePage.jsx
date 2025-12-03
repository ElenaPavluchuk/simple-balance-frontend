import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../shared/ui/Button/Button";
import DialogModal from "../../shared/ui/DialogModal/DialogModal";
import AddTransCard from "../../shared/ui/AddTransCard/AddTransCard";

export default function ExpensePage() {
  const [openAddTransModal, setOpenAddTransModal] = useState(false);
  const transes = useSelector((state) => state.transes.value);

  return (
    <div className="flex flex-row gap-20">
      <Button onClick={() => setOpenAddTransModal(true)} variant="primary">
        Add Transaction
      </Button>

      <DialogModal
        isOpen={openAddTransModal}
        onClose={() => setOpenAddTransModal(false)}
        title="Add transaction"
      >
        <AddTransCard onClose={() => setOpenAddTransModal(false)} />
      </DialogModal>

      <div>
        <ul>
          {transes
            .filter((trans) => trans.type === "expense")
            .map((trans) => (
              <li className="flex flex-col gap-2">
                <div className="flex flex-row gap-20 mt-10">
                  <p>{trans.name}</p>
                  <p>{trans.amount}</p>
                </div>
                <div className="flex flex-row gap-20">
                  <p>{trans.category}</p>
                  <p>{trans.date}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
