import { ActionIcon, Anchor, CopyButton, Group, Stack, Text, Tooltip } from "@mantine/core";
import { FC } from "react";
import { IconCheck, IconCopy, IconExternalLink } from "@tabler/icons-react";

interface TokenListProps {
  tokens: {
    name: string | null;
    logo: string | null;
    address: string;
    link: string;
    balance: string | number;
  }[] | undefined,
}

const TokenList: FC<TokenListProps> = ({
  tokens
}: TokenListProps) => {

  return (
    <Stack gap={"md"} maw={400}>
      {
        tokens && tokens.map(token => {
          return (
            <Group key={token.address} justify='space-between' gap={"xl"} align='center' wrap='nowrap'>
              <Group>
                <Stack gap={2} align='start'>
                  <Anchor size='sm' c={'var(--mantine-color-text)'} target='_blank' href={token.link}>
                    {token.name}
                  </Anchor>
                  <Text size='xs' c={'dimmed'}>{token.balance}</Text>
                </Stack>
              </Group>
              <Group gap={"xs"}>
                <CopyButton value={token.address} timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Copied' : 'Copy contract address'} withArrow position="right">
                      <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                        {copied ? (
                          <IconCheck size={16} />
                        ) : (
                          <IconCopy size={16} />
                        )}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
                <ActionIcon variant="subtle" component="a" href={token.link} target="_blank">
                  <IconExternalLink size={16} />
                </ActionIcon>
              </Group>
            </Group>
          )
        })
      }
    </Stack>
  )
}

export default TokenList;