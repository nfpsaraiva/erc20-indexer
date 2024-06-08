import { Button, Card, Center, Group, Image, Loader, Stack, Text, TextInput, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { FC, useState } from 'react';

const App: FC = () => {
  const [userAddress, setUserAddress] = useState('0xDa52002ddB5ad541d1559466Fd7505c562480dD8');

  const alchemy = new Alchemy({
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  });

  const { data: tokenDataObjects, isLoading, isError, refetch } = useQuery({
    queryKey: ["token_balance", userAddress],
    queryFn: async () => {
      const data = await alchemy.core.getTokenBalances(userAddress);

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
        <Title>ERC-20 Indexer</Title>
        <TextInput
          label="Type an address"
          value={userAddress}
          onChange={e => setUserAddress(e.target.value)}
        />
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

export default App;
