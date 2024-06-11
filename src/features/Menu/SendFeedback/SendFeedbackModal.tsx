import { Modal } from "@mantine/core";
import { FC } from "react";

interface SendFeedbackModalProps {
  opened: boolean,
  close: () => void
}

const SendFeedbackModal: FC<SendFeedbackModalProps> = ({
  opened,
  close
}: SendFeedbackModalProps) => {
  return (
    <Modal opened={opened} onClose={close} title="Send feedback">
      
    </Modal>
  )
}

export default SendFeedbackModal;