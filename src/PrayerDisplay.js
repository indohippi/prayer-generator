import React from 'react';
import { Box, Text, Spinner, Button } from '@chakra-ui/react';

function PrayerDisplay({ prayer, isLoading, resetForm }) {
  if (isLoading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" p={5} boxShadow="lg" mt={5}>
      {prayer ? (
        <>
          <Text fontSize="lg">{prayer}</Text>
          <Button onClick={resetForm} mt={4}>Reset</Button>
        </>
      ) : (
        <Text fontSize="lg" color="gray.500">
          Your personalized prayer will be displayed here...
        </Text>
      )}
    </Box>
  );
}

export default PrayerDisplay;
