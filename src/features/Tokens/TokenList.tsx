import { Anchor, Box, Center, Group, Loader, Stack, Text, UnstyledButton } from "@mantine/core";
import { FC } from "react";
import { useTokens } from "../../api";

interface TokenListProps {
  address: string,
  manualAddress: string,
  emptyBalances: boolean,
  manualAddressOpened: boolean
}

const TokenList: FC<TokenListProps> = ({
  address,
  manualAddress,
  emptyBalances,
  manualAddressOpened
}: TokenListProps) => {

  const { data: tokens, isLoading, isError } = useTokens(
    address as string,
    manualAddress,
    emptyBalances,
    manualAddressOpened
  );

  return (
    <Box py={"lg"}>
      {
        isLoading &&
        <Center>
          <Loader size={"sm"} />
        </Center>
      }
      {
        (isError || (tokens && tokens.length === 0)) &&
        <Center>
          <Text>No tokens found</Text>
        </Center>
      }
      <Stack gap={"md"}>
        {
          tokens && tokens.map(token => {
            return (
              <Group key={token.name} justify='space-between' gap={"xl"} align='center' wrap='nowrap'>
                <Group>
                  <Stack gap={2} align='start'>
                    <Anchor size='sm' c={'var(--mantine-color-text)'} target='_blank' href={token.link}>
                      {token.name}
                    </Anchor>
                    <UnstyledButton>
                      <Text size='xs' c={'dimmed'}>{token.address}</Text>
                    </UnstyledButton>
                  </Stack>
                </Group>
                <Text size='sm'>{token.balance}</Text>
              </Group>
            )
          })
        }
      </Stack>
    </Box>
  )
}

export default TokenList;