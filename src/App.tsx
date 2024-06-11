import { Anchor, Box, Burger, Button, Card, Center, Chip, Collapse, Group, Loader, Stack, Text, TextInput, Title, UnstyledButton } from '@mantine/core';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDisclosure } from '@mantine/hooks';
import ColorThemeSwitcher from './features/ColorThemeSwitcher/ColorThemeSwitcher';
import SendFeedbackButton from './features/SendFeedback/SendFeedbackButton';
import AboutButton from './features/About/AboutButton';
import MoreAppsButton from './features/MoreApps/MoreAppsButton';

const App: FC = () => {
  const [address, setAddress] = useState('');
  const [emptyBalances, setEmptyBalances] = useState(false);
  const [opened, { toggle }] = useDisclosure(false);
  const [manualAddress, manualAddressHandle] = useDisclosure(false);

  const alchemy = new Alchemy({
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  });

  const formatBalance = (balance: string | null) => {
    return Number(Utils.formatEther(Number(balance).toString())).toFixed(2);
  }

  const isEns = (address: string) => address.substring(address.length - 4, address.length) === '.eth';

  const { data: tokens, isLoading, isError } = useQuery({
    queryKey: ["tokens", address, emptyBalances],
    queryFn: async () => {

      const ethAddress = isEns(address)
       ? await alchemy.core.resolveName(address)
       : address;

       if (ethAddress === null) throw new Error('Address not found');

      const data = await alchemy.core.getTokenBalances(ethAddress);

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
    enabled: address.length === 42 || isEns(address)
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

              <Stack gap={"xs"}>
                {
                  manualAddress
                    ? <TextInput
                      autoFocus
                      placeholder='Enter a wallet address'
                      style={{ textAlign: "center" }}
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                    />
                    : <Button size='sm'>Connect Wallet</Button>
                }
                <Center>
                  <UnstyledButton onClick={manualAddressHandle.toggle}>
                    <Text c={"dimmed"} size='sm'>
                      {
                        manualAddress ? 'Or connect wallet' : 'Or enter address'
                      }
                    </Text>
                  </UnstyledButton>
                </Center>
              </Stack>

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
                  <MoreAppsButton />
                  <SendFeedbackButton />
                  <AboutButton />
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
