import { Anchor, Card, Group, Modal, Stack, Text } from "@mantine/core";
import { IconCube, IconPhoto, IconTransfer } from "@tabler/icons-react";
import { FC } from "react";

interface MoreAppsModalProps {
  opened: boolean,
  close: () => void
}

const MoreAppsModal: FC<MoreAppsModalProps> = ({
  opened,
  close
}: MoreAppsModalProps) => {
  return (
    <Modal opened={opened} onClose={close} title="More Apps" keepMounted={true}>
      <Stack gap={"xl"} mt={"lg"}>
        <Group align="center" justify="space-evenly">
          <Card bg={"cyan.8"} w={100} h={100} radius={"lg"} target="_blank" component="a" href="https://showmetheblocks.nfpsaraiva.com">
            <Stack align="center">
              <IconCube />
              <Text fw={700} ta={"center"} size="xs">Show me the blocks</Text>
            </Stack>
          </Card>
          <Card bg={"violet.8"} w={100} h={100} radius={"lg"} target="_blank" component="a" href="https://showmetheblocks.nfpsaraiva.com">
            <Stack align="center">
              <IconPhoto />
              <Text fw={700} ta={"center"} size="xs">Show me the art</Text>
            </Stack>
          </Card>
          <Card bg={"teal.8"} w={100} h={100} radius={"lg"} target="_blank" component="a" href="https://showmetheblocks.nfpsaraiva.com">
            <Stack align="center">
              <IconTransfer />
              <Text fw={700} ta={"center"} size="xs">dTranact</Text>
            </Stack>
          </Card>
        </Group>
        <Text ta={"center"} size="xs">Know more in <Anchor target="_blank" href="https://nfpsaraiva.com">nfpsaraiva.com</Anchor></Text>
      </Stack>

    </Modal>
  )
}

export default MoreAppsModal;
