import { Group, Title } from "@mantine/core";
import { FC } from "react";

const Logo: FC = () => {
  return (
    <Group align="flex-end" ta={"center"}>
      <Title visibleFrom="sm" lts={6}>show me the tokens</Title>
      <Title hiddenFrom="sm" size={"h3"} lts={6}>show me the tokens</Title>
    </Group>
  )
};

export default Logo;