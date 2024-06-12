import { Box, Card, Center, Group, RingProgress, Stack, Text } from '@mantine/core';
import { FC, useState } from 'react';
import { useCounter, useDisclosure } from '@mantine/hooks';
import { createWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { ethersConfig, mainnet, projectId } from './walletconnect';
import TokenList from './features/Tokens/TokenList';
import Menu from './features/Menu/Menu';
import Header from './features/Header/Header';
import Wallet from './features/Wallet/Wallet';
import { useBalances, useTokens } from './api';
import { IconAlertCircle } from '@tabler/icons-react';

const App: FC = () => {
  createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true,
  })

  const [manualAddress, setManualAddress] = useState('');
  const [manualAddressOpened, manualAddressHandle] = useDisclosure(false);
  const { address } = useWeb3ModalAccount();
  const [count, handlers] = useCounter(0);

  const {
    data: balances,
  } = useBalances(
    address as string,
    manualAddress,
    manualAddressOpened,
    handlers.reset
  );

  const {
    data: tokens,
    isLoading,
    isError,
    refetch,
    isRefetching

  } = useTokens(
    balances,
    handlers.increment
  );

  return (
    <Center my={"xl"} mx={"sm"}>
      <Card radius={"lg"} shadow='lg' padding={"lg"} withBorder>
        <Card.Section py={"md"} inheritPadding withBorder>
          <Stack gap={"lg"}>
            <Header />
            <Wallet
              manualAddressOpened={manualAddressOpened}
              manualAddress={manualAddress}
              setManualAddress={setManualAddress}
              manualAddressToggle={manualAddressHandle.toggle}
            />
            <Menu tokensCount={balances?.length} refetch={refetch} isRefetching={isRefetching} />
          </Stack>
        </Card.Section>
        <Box my={"md"}>
          {
            isLoading && balances &&
            <Stack align="center">
              <RingProgress
                roundCaps
                label={
                  <Text size='xs' ta={"center"}>{count} tokens</Text>
                }
                sections={[
                  { value: (count * 100 / balances.length), color: 'orange' },
                ]}
              />
            </Stack>
          }
          {
            (isError || (tokens && tokens.length === 0)) &&
            <Center>
              <Group>
                <IconAlertCircle color='orange' size={18} />
                <Stack gap={4}>
                  <Text>An error occured</Text>
                  <Text size='xs' c={"dimmed"}>Please contact support</Text>
                </Stack>

              </Group>
            </Center>
          }
          {
            tokens &&
            <TokenList
              tokens={tokens}
            />
          }

        </Box>
      </Card>
    </Center>
  )
}

export default App;
