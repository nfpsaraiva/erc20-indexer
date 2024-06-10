import { ActionIcon, Anchor, Box, Button, Card, Center, Checkbox, Chip, Group, Loader, Stack, Text, TextInput, Title, UnstyledButton } from '@mantine/core';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IconSettings } from '@tabler/icons-react';

const App: FC = () => {
  const [address, setAddress] = useState('0xDa52002ddB5ad541d1559466Fd7505c562480dD8');
  const [emptyBalances, setEmptyBalances] = useState(false);

  const alchemy = new Alchemy({
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  });

  const formatBalance = (balance: string | null) => {
    return Number(Utils.formatEther(Number(balance).toString())).toFixed(2);
  }

  const { data: tokens, isLoading, isError } = useQuery({
    queryKey: ["tokens", address, emptyBalances],
    queryFn: async () => {
      const data = await alchemy.core.getTokenBalances(address);

      const tokensPromises = [];
      for (let i = 0; i < data.tokenBalances.length; i++) {
        const tokenData = alchemy.core.getTokenMetadata(data.tokenBalances[i].contractAddress);

        tokensPromises.push(tokenData);
      }

      const tokensMetadataResponse = await Promise.all(tokensPromises);

      let tokens = tokensMetadataResponse.map((token, i) => {
        const value = formatBalance(data.tokenBalances[i].tokenBalance);
        const link = `https://etherscan.io/address/${data.tokenBalances[i].contractAddress}`;

        return {
          name: token.name,
          link,
          balance: value
        }
      });

      if (!emptyBalances) {
        tokens = tokens.filter(token => Number(token.balance) > 0);
      }

      tokens.sort((a, b) => {
        if (a.balance < b.balance) return 1;
        if (a.balance > b.balance) return -1;

        return 0;
      })

      return tokens;
    },
    enabled: address !== ""
  });

  return (
    <Center my={"xl"} mx={"sm"}>
      <Card radius={"lg"} shadow='lg' padding={"xl"} withBorder>
        <Card.Section  py={"md"} inheritPadding withBorder>
          <Stack>
            <Stack gap={4}>
              <Title order={3}>Show me the tokens</Title>
              <Text c={"dimmed"} size='xs'>Ethereum network</Text>
            </Stack>
            <Stack>
              <TextInput
                autoFocus
                placeholder='Enter a wallet address'
                style={{ textAlign: "center" }}
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
              <Button size='xs'>Connect Wallet</Button>
              <Group justify='space-between'>
                <Chip
                  radius={"sm"}
                  size='xs'
                  checked={emptyBalances}
                  onChange={() => setEmptyBalances(emptyBalances => !emptyBalances)}
                >
                  Empty balances
                </Chip>

                <ActionIcon variant='transparent'>
                  <IconSettings size={18} />
                </ActionIcon>
              </Group>
            </Stack>
          </Stack>
        </Card.Section>
        <Box py={"lg"}>
          {
            isLoading &&
            <Center>
              <Loader size={"sm"} />
            </Center>
          }
          {
            isError &&
            <Center>
              <Text>No tokens found</Text>
            </Center>
          }
          <Stack gap={"xs"}>
            {
              tokens && tokens.map(token => {
                return (
                  <Group key={token.name} justify='space-between'>
                    <Anchor c={'var(--mantine-color-text)'} target='_blank' href={token.link}>
                      {token.name}
                    </Anchor>
                    <Text>{token.balance}</Text>
                  </Group>
                )
              })
            }
          </Stack>
        </Box>
      </Card>
    </Center>
  )
}

export default App;
