import { Stack, Text, Title } from "@mantine/core";
import { FC } from "react";

const Header: FC = () => {
  return (
    <Stack gap={4}>
      <Title order={2}>Show me the tokens</Title>
      <Text c={"dimmed"} size='sm'>Ethereum network</Text>
    </Stack>
  )
}

export default Header;