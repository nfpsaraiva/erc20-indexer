import { useQuery } from "@tanstack/react-query";
import { formatBalance, isEns, isValidAddress } from "./utils";
import { Alchemy, Network, TokenBalance } from "alchemy-sdk";

const alchemy = new Alchemy({
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

const useBalances = (
  address: string,
  manualAddress: string,
  manualAddressOpened: boolean,
  reset: () => void
) => {
  return useQuery({
    queryKey: ["balances", reset, address, manualAddress, manualAddressOpened],
    queryFn: async () => {
      reset();
      let userAddress = address as string;

      if (manualAddressOpened) {
        const userManualAddress = isEns(manualAddress)
          ? await alchemy.core.resolveName(manualAddress)
          : manualAddress;

        if (userManualAddress === null) return [];

        userAddress = userManualAddress;
      }

      const data = await alchemy.core.getTokenBalances(userAddress);

      return [...new Set(data.tokenBalances.map(item => item))]; 
    },
    enabled: isValidAddress(address) || (manualAddressOpened && isValidAddress(manualAddress)),
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false
  })
}

const useTokens = (balances: TokenBalance[] | undefined, increment: any) => {
  return useQuery({
    queryKey: ["tokens", balances],
    queryFn: async () => {
      if (balances === undefined) return [];

      let tokens = [];
      for (let i = 0; i < balances.length; i++) {
        const { contractAddress, tokenBalance } = balances[i];
        const formattedBalance = formatBalance(tokenBalance);

        const token = await alchemy.core.getTokenMetadata(contractAddress);
        
        increment();

        tokens.push({
          name: token.name,
          logo: token.logo,
          address: contractAddress,
          link: `https://etherscan.io/address/${contractAddress}`,
          balance: formattedBalance
        });
      }

      return tokens;
    },
    enabled: balances !== undefined && balances.length > 0,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false
  });
}

export {
  useBalances,
  useTokens
}