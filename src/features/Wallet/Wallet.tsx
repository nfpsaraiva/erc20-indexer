import { Button, Center, Stack, Text, TextInput, UnstyledButton } from "@mantine/core";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { FC } from "react";

interface WalletProps {
  manualAddressOpened: boolean,
  manualAddress: string,
  setManualAddress: any,
  manualAddressToggle: () => void
}

const Wallet: FC<WalletProps> = ({
  manualAddressOpened,
  manualAddress,
  setManualAddress,
  manualAddressToggle
}: WalletProps) => {
  const { isConnected } = useWeb3ModalAccount();

  return (
    <Stack gap={"xs"}>
      {
        manualAddressOpened
          ? <TextInput
            autoFocus
            placeholder='Enter a wallet address'
            style={{ textAlign: "center" }}
            value={manualAddress}
            onChange={e => setManualAddress(e.target.value)}
          />
          : (
            isConnected
              ? <Center><w3m-button size='sm' /></Center>
              : <Button onClick={() => open()} size='sm'>Connect Wallet</Button>

          )
      }
      <Center>
        <UnstyledButton onClick={manualAddressToggle}>
          <Text c={"dimmed"} size='sm'>
            {
              manualAddressOpened ? 'Or use wallet' : 'Or enter address'
            }
          </Text>
        </UnstyledButton>
      </Center>
    </Stack>
  )
}

export default Wallet;