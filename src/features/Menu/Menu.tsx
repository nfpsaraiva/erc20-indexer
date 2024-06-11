import { Burger, Button, Chip, Collapse, Group, Stack } from "@mantine/core";
import { FC } from "react";
import ColorThemeSwitcher from "./ColorThemeSwitcher/ColorThemeSwitcher";
import MoreAppsButton from "./MoreApps/MoreAppsButton";
import SendFeedbackButton from "./SendFeedback/SendFeedbackButton";
import AboutButton from "./About/AboutButton";
import { useDisclosure } from "@mantine/hooks";

interface MenuProps {
  refetch: any
}

const Menu: FC<MenuProps> = ({ refetch }: MenuProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Group justify='space-between'>
        <Burger onClick={toggle} opened={opened} color='orange.5' size={"sm"} />
        <Button onClick={refetch} size="compact-xs" px={"lg"}>Get tokens</Button>
        <ColorThemeSwitcher />
      </Group>
      <Collapse in={opened}>
        <Stack gap={"xs"}>
          <MoreAppsButton />
          <SendFeedbackButton />
          <AboutButton />
        </Stack>
      </Collapse>
    </>
  )
}

export default Menu;