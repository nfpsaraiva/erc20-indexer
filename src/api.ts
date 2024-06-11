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
  emptyBalances: boolean,
  manualAddressOpened: boolean
) => {
  return useQuery({
    queryKey: ["tokens", address, manualAddress, emptyBalances, manualAddressOpened],
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
    enabled: manualAddress.length === 42 || isEns(manualAddress) || !manualAddressOpened,
  });
}

export {
  useTokens
}