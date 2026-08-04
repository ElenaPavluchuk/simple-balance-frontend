import { useState } from "react";
import Button from "../Button";
import Card from "../Card";
import DialogModal from "../DialogModal";
import DeleteAlert from "../DeleteAlert";
import PropTypes from "prop-types";

DeleteUserProfileCard.propTypes = {
  onDeleteUser: PropTypes.func.isRequired,
  isDeleteLoading: PropTypes.bool.isRequired,
};

export default function DeleteUserProfileCard({
  onDeleteUser,
  isDeleteLoading,
}) {
  const [openDialogModal, setOpenDialogModal] = useState(false);

  return (
    <Card className="flex flex-col items-center w-full max-w-md">
      <div>
        <h4 className="text-lg mb-3 text-slate-900 font-medium">
          Delete account
        </h4>
        <p className="text-base text-cyan-950 text-pretty">
          You will lose access to your Simple Balance account once your deletion
        </p>
      </div>

      <Button
        variant="danger"
        onClick={() => setOpenDialogModal(true)}
        className="mt-9 w-full md:max-w-1/3"
      >
        Delete account
      </Button>

      <DialogModal
        isOpen={openDialogModal}
        onClose={() => setOpenDialogModal(false)}
        title="Permanantly delete this account?"
      >
        <DeleteAlert
          message="The account with any exsisting information will be removed"
          onDelete={onDeleteUser}
          onClose={() => setOpenDialogModal(false)}
          isLoading={isDeleteLoading}
        />
      </DialogModal>
    </Card>
  );
}
