import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconApps } from "@tabler/icons-react";
import { FC } from "react";
import MoreAppsModal from "./MoreAppsModal";

const MoreAppsButton: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        onClick={open}
        leftSection={<IconApps size={16} />}
        size='sm'
        variant='subtle'
        color='var(--mantine-color-text)'
      >
        More apps
      </Button>
      <MoreAppsModal opened={opened} close={close} />
    </>
  )
}

export default MoreAppsButton;