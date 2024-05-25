import React from 'react';
import { Box, Text, Button } from 'native-base';

const HomeScreen = ({ navigation }) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text>Welcome to Home Screen</Text>
      <Button onPress={() => navigation.navigate('Form')}>Go to Form</Button>
    </Box>
  );
};

export default HomeScreen;
