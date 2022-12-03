import { ModalDialog } from "@components/ModalDialog";

type DeleteDialogProps = {
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export const DeleteScenarioDialog: React.FC<DeleteDialogProps> = ({
  show,
  onClose,
  onSubmit,
}) => {
  return (
    <ModalDialog
      title="Delete Scenario"
      show={show}
      submitLabel="Delete"
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <p>Delete scenario?</p>
    </ModalDialog>
  );
};
