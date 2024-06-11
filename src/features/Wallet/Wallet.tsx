import { Button, Center, Stack, TextInput } from "@mantine/core";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";
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
  const { open } = useWeb3Modal();

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
        <Button
          variant="subtle"
          size="xs"
          color="--var(mantine-color-text)"
          px={"xl"}
          c={"dimmed"}
          onClick={manualAddressToggle}
        >
          {
            manualAddressOpened ? 'Or use wallet' : 'Or enter address'
          }
        </Button>
      </Center>
    </Stack>
  )
}

export default Wallet;