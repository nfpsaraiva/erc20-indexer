import { Modal } from "@mantine/core";
import { FC } from "react";

interface AboutModalProps {
  opened: boolean,
  close: () => void
}

const AboutModal: FC<AboutModalProps> = ({
  opened,
  close
}: AboutModalProps) => {
  return (
    <Modal opened={opened} onClose={close} title="About">

    </Modal>
  )
}

export default AboutModal;