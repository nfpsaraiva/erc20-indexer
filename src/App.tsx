import { Card, Center, Stack } from '@mantine/core';
import { FC, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { createWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { ethersConfig, mainnet, projectId } from './walletconnect';
import TokenList from './features/Tokens/TokenList';
import Menu from './features/Menu/Menu';
import Header from './features/Header/Header';
import Wallet from './features/Wallet/Wallet';

const App: FC = () => {
  createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
  })

  const [manualAddress, setManualAddress] = useState('');
  const [emptyBalances, setEmptyBalances] = useState(false);
  const [manualAddressOpened, manualAddressHandle] = useDisclosure(false);
  const { address } = useWeb3ModalAccount();

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
            <Menu emptyBalances={emptyBalances} setEmptyBalances={setEmptyBalances} />
          </Stack>
        </Card.Section>
        <TokenList
          address={address as string}
          manualAddress={manualAddress}
          emptyBalances={emptyBalances}
          manualAddressOpened={manualAddressOpened}
        />
      </Card>
    </Center>
  )
}

export default App;
