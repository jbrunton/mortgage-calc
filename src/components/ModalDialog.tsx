import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

type ModalDialogProps = {
  title: string;
  show: boolean;
  submitLabel?: string;
  onSubmit: () => void;
  onClose: () => void;
  children: React.ReactNode;
};

export const ModalDialog: React.FC<ModalDialogProps> = ({
  title,
  show,
  submitLabel,
  onSubmit,
  onClose,
  children,
}) => {
  const { isOpen, onOpen: openDialog, onClose: closeDialog } = useDisclosure();

  useEffect(() => {
    if (show) {
      openDialog();
    } else {
      closeDialog();
    }
  }, [show]);

  return (
    <Modal isOpen={isOpen} onClose={closeDialog}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              onSubmit();
              onClose();
            }}
          >
            {submitLabel ?? "Submit"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
