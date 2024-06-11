import { Modal } from "@mantine/core";
import { FC } from "react";

interface MoreAppsModalProps {
  opened: boolean,
  close: () => void
}

const MoreAppsModal: FC<MoreAppsModalProps> = ({
  opened,
  close
}: MoreAppsModalProps) => {
  return (
    <Modal opened={opened} onClose={close} title="More Apps">
      
    </Modal>
  )
}

export default MoreAppsModal;
