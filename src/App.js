import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Heading, Text, Container } from '@chakra-ui/react';
import PrayerForm from './PrayerForm';
import PrayerDisplay from './PrayerDisplay';

function App() {
  // State to store the prayer text
  const [prayer, setPrayer] = useState('');

  return (
    <ChakraProvider>
      <Box textAlign="center" fontSize="xl">
        <Container maxW="container.md">
          <VStack spacing={8} py={10}>
            <Heading>Personalized Prayer Generator</Heading>
            <Text>
              Welcome to the Personalized Prayer Generator. Fill out the form below and receive a custom prayer tailored to your needs.
            </Text>
            <PrayerForm setPrayer={setPrayer} /> {/* Passing setPrayer to PrayerForm */}
            <PrayerDisplay prayer={prayer} /> {/* Passing prayer to PrayerDisplay */}
          </VStack>
        </Container>
      </Box>
      <Box p={4}>
        <Text align="center">
          Made with ❤️ using Chakra UI
        </Text>
      </Box>
    </ChakraProvider>
  );
}

export default App;
