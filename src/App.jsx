import { Box, Button, Flex, Image, SimpleGrid, TextInput, Title } from '@mantine/core';
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
    <Box w="100vw">
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent={'center'}
      >
        <TextInput
          onChange={(e) => setUserAddress(e.target.value)}
          color="black"
          w="600px"
          textAlign="center"
          p={4}
          bgColor="white"
          fontSize={24}
          value={userAddress}
        />
        <Button fontSize={20} onClick={getTokenBalance} mt={36} bgColor="blue">
          Check ERC-20 Token Balances
        </Button>

        <Title my={36}>ERC-20 token balances:</Title>

        {hasQueried &&
          results.tokenBalances.map((e, i) => {
            return (
              <Flex
                flexDir={'column'}
                color="white"
                bg="blue"
                w={'20vw'}
                key={e.id}
              >
                <Box>
                  <b>Symbol:</b> ${tokenDataObjects[i].symbol}&nbsp;
                </Box>
                <Box>
                  <b>Balance:</b>&nbsp;
                  {Utils.formatUnits(
                    e.tokenBalance,
                    tokenDataObjects[i].decimals
                  )}
                </Box>
                <Image src={tokenDataObjects[i].logo} />
              </Flex>
            );
          })
        }
      </Flex>
    </Box>
  );
}

export default App;
