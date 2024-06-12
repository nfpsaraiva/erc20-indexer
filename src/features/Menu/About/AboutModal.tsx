import { Modal, Text } from "@mantine/core";
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
      <Text>
        Streamlined tool designed to help users explore their ERC-20 token holdings.
        The app lets you check all your current ERC-20 from a given address as well as their current balance.
      </Text>

    </Modal>
  )
}

export default AboutModal;