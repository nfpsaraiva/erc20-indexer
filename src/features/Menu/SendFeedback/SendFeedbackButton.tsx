import { Button } from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";
import { FC } from "react";
import SendFeedbackModal from "./SendFeedbackModal";
import { useDisclosure } from "@mantine/hooks";

const SendFeedbackButton: FC = () => {
  const [opened, {open, close}] = useDisclosure(false);

  return (
    <>
      <Button
        onClick={open}
        leftSection={<IconMessage size={16} />}
        size='sm'
        variant='subtle'
        color='var(--mantine-color-text)'>
        Send feedback
      </Button>
      <SendFeedbackModal opened={opened} close={close} />
    </>
  )
}

export default SendFeedbackButton;