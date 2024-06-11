import { Box, Card, Center, Loader, Stack, Text } from '@mantine/core';
import { FC, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { createWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { ethersConfig, mainnet, projectId } from './walletconnect';
import TokenList from './features/Tokens/TokenList';
import Menu from './features/Menu/Menu';
import Header from './features/Header/Header';
import Wallet from './features/Wallet/Wallet';
import { useTokens } from './api';

const App: FC = () => {
  createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
  })

  const [manualAddress, setManualAddress] = useState('');
  const [manualAddressOpened, manualAddressHandle] = useDisclosure(false);
  const { address } = useWeb3ModalAccount();

  const {
    data: tokens,
    isLoading,
    isError,
    refetch
  } = useTokens(
    address as string,
    manualAddress,
    manualAddressOpened
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
            <Menu refetch={refetch} />
          </Stack>
        </Card.Section>
        <Box my={"md"}>
          {
            isLoading &&
            <Stack align="center">
              <Loader size={"sm"} />
              <Stack gap={"xs"} align="center">
                <Text>Hold on</Text>
                <Text size="xs">This may take a while</Text>
              </Stack>
            </Stack>
          }
          {
            isError &&
            <Center>
              <Text>No tokens found</Text>
            </Center>
          }
          <TokenList
            tokens={tokens}
          />
        </Box>
      </Card>
    </Center>
  )
}

export default App;
