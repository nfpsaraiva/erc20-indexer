import { Burger, Chip, Collapse, Group, Stack } from "@mantine/core";
import { FC } from "react";
import ColorThemeSwitcher from "./ColorThemeSwitcher/ColorThemeSwitcher";
import MoreAppsButton from "./MoreApps/MoreAppsButton";
import SendFeedbackButton from "./SendFeedback/SendFeedbackButton";
import AboutButton from "./About/AboutButton";
import { useDisclosure } from "@mantine/hooks";

interface MenuProps {
  emptyBalances: boolean,
  setEmptyBalances: React.Dispatch<React.SetStateAction<boolean>>
}

const Menu: FC<MenuProps> = ({
  emptyBalances,
  setEmptyBalances
}: MenuProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Group justify='space-between'>
        <Burger onClick={toggle} opened={opened} color='orange.5' size={"sm"} />
        <Chip
          variant='light'
          radius={"sm"}
          size='xs'
          checked={emptyBalances}
          onChange={() => setEmptyBalances(emptyBalances => !emptyBalances)}
        >
          Show empty balances
        </Chip>
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