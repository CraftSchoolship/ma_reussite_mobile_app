import { Box, HStack, Pressable, Text, VStack } from "native-base";
import React from "react";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const PaymentCard = ({
  date,
  amount,
  name,
  state,
  currency_symbol,
  handlePress,
  deposit = 0,
  isDarkMode,
}) => {
  const statusPayment =
    state !== "not_paid"
      ? { color: MA_REUSSITE_CUSTOM_COLORS.Success, text: "Confirmé" }
      : deposit > 0
      ? { color: MA_REUSSITE_CUSTOM_COLORS.Secondary, text: "En Attente" }
      : { color: MA_REUSSITE_CUSTOM_COLORS.Danger, text: "En Attente" };

  return (
    <Box borderRadius={10} overflow="hidden" mx={3} my={1}>
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
          <HStack w="100%" alignItems="center">
            <Box flex={0.65}>
              <Text
                color={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black
                }
                fontSize="lg"
                fontWeight="bold"
              >
                {`${name} : ${amount} ${currency_symbol}`}
              </Text>
              <Text
                fontSize="md"
                color={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.LightTextCalendarCard
                    : MA_REUSSITE_CUSTOM_COLORS.Black
                }
              >
                {`Date: ${date}`}
              </Text>
            </Box>
            <Box alignItems="flex-end" flex={0.35} mt={2}>
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
            </Box>
          </HStack>
          <HStack mt={2}>
            <Pressable
              onPress={() =>
                handlePress({
                  date,
                  amount,
                  name,
                  state,
                  currency_symbol,
                  deposit,
                })
              }
            >
              <Text color={MA_REUSSITE_CUSTOM_COLORS.LightTextCalendarCard}>
                Détails du paiement...
                <Text underline fontWeight="500" color="blue.500">
                  Voir plus
                </Text>
              </Text>
            </Pressable>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default PaymentCard;
