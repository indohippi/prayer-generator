import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function PrayerDisplay({ prayer }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={5} boxShadow="lg">
      {prayer ? (
        <Text fontSize="lg">{prayer}</Text>
      ) : (
        <Text fontSize="lg" color="gray.500">
          Your personalized prayer will be displayed here...
        </Text>
      )}
    </Box>
  );
}

export default PrayerDisplay;
