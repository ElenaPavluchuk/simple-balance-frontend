import { useState } from "react";
import Button from "../Button";
import DialogModal from "../DialogModal";
import DeleteAlert from "../DeleteAlert";

export default function DeleteUserProfileCard({ onDeleteUser, isLoading }) {
  const [openDialogModal, setOpenDialogModal] = useState(false);

  return (
    <div className="flex flex-col items-center bg-white p-6 shadow-md rounded-3xl w-full max-w-md">
      <div>
        <h4 className="text-lg mb-3">Delete account</h4>
        <p>
          You will lose access to your Simple Balance account once your deletion
        </p>
      </div>

      <Button
        variant="danger"
        onClick={() => setOpenDialogModal(true)}
        className="mt-9 max-w-1/3"
      >
        Delete account
      </Button>

      <DialogModal
        isOpen={openDialogModal}
        onClose={() => setOpenDialogModal(false)}
        title="Permanantly delete this account?"
      >
        <DeleteAlert
          content="The account with any exsisting information will be removed"
          onDelete={onDeleteUser}
          onClose={() => setOpenDialogModal(false)}
          isLoading={isLoading}
        />
      </DialogModal>
    </div>
  );
}
