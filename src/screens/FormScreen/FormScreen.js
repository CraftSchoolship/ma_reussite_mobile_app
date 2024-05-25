import React from "react";
import { Box, Center, Text } from "native-base";
import FormExample from "../../components/Form/FormExemple";

const FormScreen = () => {
  return (
    <Center flex={1}>
      <Box width={"100%"} p={4}>
        <Text>Form Screen</Text>
        <FormExample />
      </Box>
    </Center>
  );
};

export default FormScreen;
