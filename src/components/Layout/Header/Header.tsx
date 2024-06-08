import { ActionIcon, Collapse, Group, Stack, rem } from "@mantine/core";
import { FC } from "react";
import { ColorThemeSwitcher, Logo, SearchBox } from "../../../features";
import { IconSearch } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const Header: FC = () => {
  const [searchOpened, searchHandle] = useDisclosure(false);

  return (
    <Stack align="center" h={"100%"} py={"md"}>
      <Logo />
      <Group>
        <ActionIcon size={"lg"} variant={searchOpened ? 'filled': 'subtle'} onClick={searchHandle.toggle}>
          <IconSearch style={{width: rem(22), height: rem(22)}} stroke={1.5} />
        </ActionIcon>
        <ColorThemeSwitcher />
      </Group>

      <Collapse in={searchOpened}>
        <SearchBox />
      </Collapse>
    </Stack>
  )
}

export default Header;