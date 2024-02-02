import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Heading, Text, Container } from '@chakra-ui/react';
import PrayerForm from './PrayerForm';
import PrayerDisplay from './PrayerDisplay';

function App() {
  const [prayer, setPrayer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setPrayer('');
    setIsLoading(false); // Ensure to reset the loading state as well
  };

  return (
    <ChakraProvider>
      <Box textAlign="center" fontSize="xl">
        <Container maxW="container.md">
          <VStack spacing={8} py={10}>
            <Heading>Personalized Prayer Generator</Heading>
            <Text>Welcome to the Personalized Prayer Generator. Fill out the form below and receive a custom prayer tailored to your needs.</Text>
            <PrayerForm setPrayer={setPrayer} setIsLoading={setIsLoading} />
            <PrayerDisplay prayer={prayer} isLoading={isLoading} resetForm={resetForm} />
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
