import { Button, Card, Center, Group, Image, Loader, Stack, Text, TextInput, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { FC, useState } from 'react';
import useStore from '../../../state/store';
import { useShallow } from 'zustand/react/shallow';

const Main: FC = () => {

  const alchemy = new Alchemy({
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  });

  const [
    searchTerm,
    setSearchTerm
  ] = useStore(useShallow(state => [
    state.searchTerm,
    state.setSearchTerm
  ]));

  const { data: tokenDataObjects, isLoading, isError, refetch } = useQuery({
    queryKey: ["token_balance", searchTerm],
    queryFn: async () => {
      const data = await alchemy.core.getTokenBalances(searchTerm);

      const tokensPromises = [];
      for (let i = 0; i < data.tokenBalances.length; i++) {
        const tokenData = alchemy.core.getTokenMetadata(data.tokenBalances[i].contractAddress);

        tokensPromises.push(tokenData);
      }

      const tokens = await Promise.all(tokensPromises);

      return tokens.map((o, i) => ({
        ...o,
        balance: data.tokenBalances[i].tokenBalance
      }));
    },
    enabled: false
  });


  return (
    <Center>
      <Stack>
        <Button onClick={() => refetch()}>Get tokens</Button>
        {
          isLoading && <Center><Loader /></Center>
        }
        {
          isError && <Text>No tokens found</Text>
        }
        {
          tokenDataObjects &&
          tokenDataObjects.map(token => {
            return (
              <Card key={token.name}>
                <Stack>
                  <Image w={50} src={token.logo} />
                  <Text>Token: {token.symbol}</Text>
                  <Text>Balance: {Utils.formatUnits(Number(token.balance).toString(), Number(token.decimals))}</Text>
                  <Group></Group>
                </Stack>
              </Card>
            );
          })
        }
      </Stack>
    </Center>
  );
}

export default Main;