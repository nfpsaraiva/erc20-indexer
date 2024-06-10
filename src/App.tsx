import { ActionIcon, Anchor, Box, Burger, Button, Card, Center, Checkbox, Chip, Collapse, Group, Image, Loader, Menu, Stack, Text, TextInput, Title, UnstyledButton } from '@mantine/core';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IconDotsVertical, IconInfoCircle, IconMenu, IconMenu2, IconMessage, IconSettings } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import ColorThemeSwitcher from './ColorThemeSwitcher/ColorThemeSwitcher';

const App: FC = () => {
  const [address, setAddress] = useState('');
  const [emptyBalances, setEmptyBalances] = useState(false);
  const [opened, { toggle }] = useDisclosure(false);

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
          logo: token.logo,
          address: data.tokenBalances[i].contractAddress,
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
      <Card radius={"lg"} shadow='lg' padding={"lg"} withBorder>
        <Card.Section py={"md"} inheritPadding withBorder>
          <Stack>
            <Stack gap={4}>
              <Title order={2}>Show me the tokens</Title>
              <Text c={"dimmed"} size='sm'>Ethereum network</Text>
            </Stack>
            <Stack>
              <TextInput
                autoFocus
                placeholder='Enter a wallet address'
                style={{ textAlign: "center" }}
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
              <Button size='sm'>Connect Wallet</Button>

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
                  <Button leftSection={<IconMessage size={16} />} size='sm' variant='subtle' color='var(--mantine-color-text)'>Send feedback</Button>
                  <Button leftSection={<IconInfoCircle size={16} />} size='sm' variant='subtle' color='var(--mantine-color-text)'>About</Button>
                </Stack>
              </Collapse>
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
      </Card>
    </Center>
  )
}

export default App;
