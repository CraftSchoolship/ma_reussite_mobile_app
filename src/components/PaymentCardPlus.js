import { Box, HStack, Text, VStack } from "native-base";
import React from "react";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const PaymentCardPlus = ({ isDarkMode, paymentDetails }) => {
  const statusPayment =
    paymentDetails.state !== "not_paid"
      ? { color: MA_REUSSITE_CUSTOM_COLORS.Success, text: "Confirmé" }
      : paymentDetails.deposit > 0
      ? { color: MA_REUSSITE_CUSTOM_COLORS.Secondary, text: "En Attente" }
      : { color: MA_REUSSITE_CUSTOM_COLORS.Danger, text: "En Attente" };

  return (
    <Box borderRadius={10} overflow={"hidden"} mx={3} my={1}>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        bg={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.Black
            : MA_REUSSITE_CUSTOM_COLORS.White
        }
        p={4}
      >
        <VStack w="100%">
          <Text
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
            fontSize="lg"
            fontWeight="bold"
          >
            {`${paymentDetails.name} : ${paymentDetails.amount} ${paymentDetails.currency_symbol}`}
          </Text>
          <Text
            fontSize="md"
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.LightTextCalendarCard
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
          >
            {`Date: ${paymentDetails.date}`}
          </Text>
          <Text
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
            mt={1}
            fontSize="md"
          >
            Status: {statusPayment.text}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default PaymentCardPlus;



{
  /* <Box alignItems="flex-end" mt={2}>
<Box
  alignSelf="flex-end"
  bg={statusPayment.color}
  px={4}
  py={0.5}
  rounded="xl"
>
  <Text color={MA_REUSSITE_CUSTOM_COLORS.White}>
    {statusPayment.text}
  </Text>
</Box>
<Text
  color={
    isDarkMode
      ? MA_REUSSITE_CUSTOM_COLORS.White
      : MA_REUSSITE_CUSTOM_COLORS.Black
  }
  mt={1}
  fontSize="md"
>
  Status: {statusPayment.text}
</Text>
</Box> */
}