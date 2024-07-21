import { useDisclosure } from "@nextui-org/use-disclosure";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { useState } from "react";

type Props = {
  confirmtitle?: string;
  confirmtext?: string;
  isOpen: any;
  onClose: () => void;
  onSubmit: () => Promise<void>;
};

const ConfirmModal = ({
  confirmtitle,
  confirmtext,
  isOpen,
  onClose,
  onSubmit,
}: Props) => {
  const { onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onOpenChange();
    onClose();
  };

  const handleConfirm = async () => {
    setLoading(true);
    await onSubmit();
    setLoading(false);
    handleClose();
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {confirmtitle}
        </ModalHeader>
        <ModalBody>
          <p>{confirmtext}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            variant="light"
            onPress={handleConfirm}
            isLoading={loading}
          >
            확인
          </Button>
          <Button color="danger" variant="light" onPress={handleClose}>
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
