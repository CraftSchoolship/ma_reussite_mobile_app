import React from 'react';
import { Box, Text } from 'native-base';
import FormExample from '../../components/Form/FormExemple';

const FormScreen = () => {
  return (
    <Box flex={1} p={4}>
      <Text>Form Screen</Text>
      <FormExample />
    </Box>
  );
};

export default FormScreen;
