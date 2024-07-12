"use client";

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
  title: string;
  text: string;
  isOpen: any;
  onClose: () => void;
  onSubmit?: () => void;
};

const ConfirmModal = ({
  confirmtitle,
  title,
  confirmtext,
  text,
  isOpen,
  onClose,
  onSubmit,
}: Props) => {
  const { onOpenChange } = useDisclosure();
  const [confirm, setConfirm] = useState(false);
  const handleClose = () => {
    onOpenChange();
    onClose();
  };

  const handleConfirm = () => {
    if (onSubmit) {
      onSubmit();
    }
    handleClose();
    setConfirm(true);
  };

  return (
    <>
      <div>
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
              <Button color="primary" variant="light" onPress={handleConfirm}>
                확인
              </Button>
              <Button color="danger" variant="light" onPress={handleClose}>
                취소
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <div>
        <Modal
          backdrop="opaque"
          isOpen={confirm}
          onOpenChange={() => setConfirm(false)}
          onClose={() => setConfirm(false)}
          classNames={{
            backdrop:
              "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          }}
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <p>{text}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                variant="light"
                onPress={() => setConfirm(false)}
              >
                확인
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default ConfirmModal;
