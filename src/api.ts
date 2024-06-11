import { useQuery } from "@tanstack/react-query";
import { formatBalance, isEns } from "./utils";
import { Alchemy, Network } from "alchemy-sdk";

const alchemy = new Alchemy({
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

const useTokens = (
  address: string,
  manualAddress: string,
  manualAddressOpened: boolean,
) => {
  return useQuery({
    queryKey: ["tokens", address, manualAddress, manualAddressOpened],
    queryFn: async () => {
      let userAddress = address as string;

      if (manualAddressOpened) {
        const userManualAddress = isEns(manualAddress) ? await alchemy.core.resolveName(manualAddress) : manualAddress;

        if (userManualAddress === null) {
          return []
        }

        userAddress = userManualAddress;
      }

      const data = await alchemy.core.getTokenBalances(userAddress);

      let tokens = [];
      for (let i = 0; i < data.tokenBalances.length; i++) {
        const { contractAddress, tokenBalance } = data.tokenBalances[i];
        const formattedBalance = formatBalance(tokenBalance);

        const token = await alchemy.core.getTokenMetadata(contractAddress);
        const link = `https://etherscan.io/address/${contractAddress}`;

        tokens.push({
          name: token.name,
          logo: token.logo,
          address: data.tokenBalances[i].contractAddress,
          link,
          balance: formattedBalance
        });
      }

      return tokens;
    },
    // enabled: manualAddress.length === 42 || isEns(manualAddress) || !manualAddressOpened,
    enabled: false
  });
}

export {
  useTokens
}