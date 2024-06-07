import { Box, Button, Card, Center, Flex, Group, Image, SimpleGrid, Stack, Text, TextInput, Title } from '@mantine/core';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useState } from 'react';

function App() {
  const [userAddress, setUserAddress] = useState('0xDa52002ddB5ad541d1559466Fd7505c562480dD8');
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);

  async function getTokenBalance() {
    const config = {
      apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
      network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(config);
    const data = await alchemy.core.getTokenBalances(userAddress);

    setResults(data);

    const tokenDataPromises = [];

    for (let i = 0; i < data.tokenBalances.length; i++) {
      const tokenData = alchemy.core.getTokenMetadata(
        data.tokenBalances[i].contractAddress
      );
      tokenDataPromises.push(tokenData);
    }

    setTokenDataObjects(await Promise.all(tokenDataPromises));
    setHasQueried(true);
  }
  return (
    <Center>
      <Stack>
        <Title>ERC-20 Indexer</Title>

        <TextInput
          label="Type an address"
          value={userAddress}
          onChange={e => setUserAddress(e.target.value)}
        />
        <Button onClick={getTokenBalance}>
          Show Tokens
        </Button>

        {
          hasQueried &&
          results.tokenBalances.map((token, i) => {
            return (
              <Card key={i}>
                <Stack>
                  <Image src={tokenDataObjects[i].logo} />
                  <Text>Token: {tokenDataObjects[i].symbol}</Text>
                  <Text>Balance: {Utils.formatUnits(token.tokenBalance, tokenDataObjects[i].decimals)}</Text>
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
