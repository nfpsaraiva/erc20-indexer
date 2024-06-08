import { Anchor, Center, Group, Text } from "@mantine/core";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <Center h={"100%"}>
      <Anchor
        href="https://nfpsaraiva.com"
        target="_blank"
        underline="never"
        size="sm"
        c="var(--mantine-color-green)"
      >2024 nfpsaraiva.com</Anchor>
    </Center>
  )
}

export default Footer;