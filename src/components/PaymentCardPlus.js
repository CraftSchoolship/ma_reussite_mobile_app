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
          >
            {`Ref : ${paymentDetails.name}`}
          </Text>
          <Text
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
            fontSize="lg"
          >
            {`Montant : ${paymentDetails.amount} ${paymentDetails.currency_symbol}`}
          </Text>
          <Text
            fontSize="lg"
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.LightTextCalendarCard
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
          >
            {`Date: ${paymentDetails.date}`}
          </Text>
          <HStack>
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              mt={1}
              fontSize="lg"
            >
              Status:
            </Text>
            <Box
              alignSelf="flex-end"
              bg={statusPayment.color}
              px={4}
              py={0.5}
              ml={2}
              rounded="xl"
            >
              <Text color={MA_REUSSITE_CUSTOM_COLORS.White}>
                {statusPayment.text}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default PaymentCardPlus;
