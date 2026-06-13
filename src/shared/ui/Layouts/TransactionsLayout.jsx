import { useState } from "react";
import Button from "../Button";
import DialogModal from "../DialogModal";
import CreateTransactionForm from "../Transactions/CreateTransactionForm";
import PropTypes from "prop-types";

TransactionsLayout.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default function TransactionsLayout({ title, type, children, onSave }) {
  const [openDialogModal, setOpenDialogModal] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 mb-9 sm:flex-row sm:justify-between sm:items-center">
        <h2 className="font-semibold text-xl">{title}</h2>
        <Button onClick={() => setOpenDialogModal(true)} variant="primary">
          Add Transaction
        </Button>
      </div>

      <DialogModal
        isOpen={openDialogModal}
        onClose={() => setOpenDialogModal(false)}
        title="Add transaction"
      >
        <CreateTransactionForm
          type={type}
          onSave={onSave}
          onClose={() => setOpenDialogModal(false)}
        />
      </DialogModal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">{children}</div>
    </>
  );
}
