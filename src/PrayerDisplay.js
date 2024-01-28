import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function PrayerDisplay({ prayer }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={5} boxShadow="lg" mt={5}>
      {prayer ? (
        <Text fontSize="lg">{prayer}</Text> // Displays the prayer
      ) : (
        <Text fontSize="lg" color="gray.500">
          Your personalized prayer will be displayed here...
        </Text> // Displays before a prayer is generated
      )}
    </Box>
  );
}

export default PrayerDisplay;
