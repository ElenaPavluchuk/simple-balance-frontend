import { useState } from "react";
import Button from "../../shared/ui/Button/Button";
import DialogModal from "../../shared/ui/DialogModal/DialogModal";
import AddTransCard from "../../shared/ui/AddTransCard/AddTransCard";
import TransesList from "../../shared/ui/TransesList/TransesList";

export default function ExpensePage() {
  const [openAddTransModal, setOpenAddTransModal] = useState(false);

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
      <TransesList />
    </div>
  );
}
