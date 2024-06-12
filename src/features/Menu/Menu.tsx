import { ActionIcon, Burger, Collapse, Group, Stack, Text } from "@mantine/core";
import { FC } from "react";
import ColorThemeSwitcher from "./ColorThemeSwitcher/ColorThemeSwitcher";
import { useDisclosure } from "@mantine/hooks";
import MoreAppsButton from "./MoreApps/MoreAppsButton";
import SendFeedbackButton from "./SendFeedback/SendFeedbackButton";
import AboutButton from "./About/AboutButton";
import { IconRefresh } from "@tabler/icons-react";

interface MenuProps {
  tokensCount: number | undefined,
  refetch: any,
  isRefetching: any
}

const Menu: FC<MenuProps> = ({ tokensCount, refetch, isRefetching }: MenuProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Group justify='space-between' wrap="nowrap">
        <Burger onClick={toggle} opened={opened} color='orange.5' size={"sm"} />
        {
          tokensCount !== undefined &&
          (
            isRefetching
              ? <Text size="sm">Refetching...</Text>
              : <Group>
                <Text size="sm">{tokensCount} tokens found</Text>
                <ActionIcon disabled={isRefetching} size={"xs"} onClick={refetch} variant="subtle">
                  <IconRefresh size={14} />
                </ActionIcon>
              </Group>
          )
        }
        <ColorThemeSwitcher />
      </Group >
      <Collapse in={opened}>
        <Stack gap={"xs"}>
          <SendFeedbackButton />
          <MoreAppsButton />
          <AboutButton />
        </Stack>
      </Collapse>
    </>
  )
}

export default Menu;