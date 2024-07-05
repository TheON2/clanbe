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
import Image from "next/image";

type Props = {
  point: number;
  isOpen: any;
  onClose: () => void;
  onSubmit?: () => void;
};

const DailyPointModal = ({ point, isOpen, onClose, onSubmit }: Props) => {
  const { onOpenChange } = useDisclosure();
  const handleClose = () => {
    onOpenChange();
    onClose();
  };

  const handleConfirm = () => {
    if (onSubmit) {
      onSubmit();
    }
    handleClose();
  };

  return (
    <div>
      <Modal
        placement="center"
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center">
            일일 접속 보상
          </ModalHeader>
          <ModalBody className="flex justify-center items-center">
            <Image
              src={"/dailypoint.gif"}
              alt={"dailypoint"}
              width={100}
              height={100}
            />
            <p>{point}포인트를 획득 했습니다!</p>
          </ModalBody>
          <ModalFooter className="flex justify-center">
            <Button color="primary" variant="light" onPress={handleConfirm}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DailyPointModal;
