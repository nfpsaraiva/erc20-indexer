import { Button, Card, Center, Group, Image, Stack, Text, TextInput, Title } from '@mantine/core';
import { Alchemy, Network, TokenBalancesResponseErc20, TokenMetadataResponse, Utils } from 'alchemy-sdk';
import { FC, useState } from 'react';

const App: FC = () => {
  const [userAddress, setUserAddress] = useState('0xDa52002ddB5ad541d1559466Fd7505c562480dD8');
  const [results, setResults] = useState<TokenBalancesResponseErc20>();
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState<TokenMetadataResponse[]>([]);

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

    const tokenDataObjects = await Promise.all(tokenDataPromises);

    setTokenDataObjects(tokenDataObjects);
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
          hasQueried && results &&
          results.tokenBalances.map((token, i) => {
            const tokenBalance = Number(token.tokenBalance);
            const decimals = Number(tokenDataObjects[i].decimals);
            console.log("tokenBalance", tokenBalance);
            console.log("decimals", decimals);
            console.log(Utils.formatUnits(tokenBalance, decimals));

            return (
              <Card key={i}>
                <Stack>
                  <Image src={tokenDataObjects[i].logo} />
                  <Text>Token: {tokenDataObjects[i].symbol}</Text>
                  {/* <Text>Balance: {Utils.formatUnits(Number(token.tokenBalance), Number(tokenDataObjects[i].decimals))}</Text> */}
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
