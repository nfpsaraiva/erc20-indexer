import { useInfiniteQuery } from "@tanstack/react-query";
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
  manualAddressOpened: boolean,
) => {
  const LIMIT = 3;

  return useInfiniteQuery({
    queryKey: ["tokens", address, manualAddress, emptyBalances, manualAddressOpened],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
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
      for (let i = pageParam; i < (pageParam + LIMIT); i++) {
        const {contractAddress, tokenBalance} = data.tokenBalances[i];
        const fomattedBalance = formatBalance(tokenBalance);

        if (!emptyBalances && fomattedBalance === '0') {
          continue;
        }

        const token = await alchemy.core.getTokenMetadata(contractAddress);
        const link = `https://etherscan.io/address/${contractAddress}`;

        tokens.push({
          name: token.name,
          logo: token.logo,
          address: data.tokenBalances[i].contractAddress,
          link,
          balance: fomattedBalance
        });
      }


      if (!emptyBalances) {
        tokens = tokens.filter(token => Number(token.balance) > 0);
      }

      return tokens;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < LIMIT) return null;

      return allPages.length * LIMIT
    },
    enabled: manualAddress.length === 42 || isEns(manualAddress) || !manualAddressOpened,
  });
}

export {
  useTokens
}