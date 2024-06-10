import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import { FC } from "react";
import AboutModal from "./AboutModal";

const AboutButton: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        onClick={open}
        leftSection={<IconInfoCircle size={16} />}
        size='sm'
        variant='subtle'
        color='var(--mantine-color-text)'>
        About
      </Button>
      <AboutModal opened={opened} close={close} />
    </>
  )
}

export default AboutButton;