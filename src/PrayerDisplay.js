import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function PrayerDisplay({ prayer }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={5} boxShadow="lg" mt={5}>
      {prayer ? (
        // Here you can add additional styling or elements to display the prayer
        <Text fontSize="lg">{prayer}</Text>
      ) : (
        // This will show before a prayer is generated
        <Text fontSize="lg" color="gray.500">
          Your personalized prayer will be displayed here...
        </Text>
      )}
    </Box>
  );
}

export default PrayerDisplay;
