import { Box, HStack, Pressable, Text, VStack } from "native-base";
import React, { useEffect } from "react";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const PaymentCard = ({ payment, handlePress, isDarkMode, itemId }) => {
  const statusPayment =
    payment?.state !== "not_paid"
      ? { color: MA_REUSSITE_CUSTOM_COLORS.Success, text: "Confirmé" }
      : payment?.deposit > 0
      ? { color: MA_REUSSITE_CUSTOM_COLORS.Secondary, text: "En Attente" }
      : { color: MA_REUSSITE_CUSTOM_COLORS.Danger, text: "En Attente" };

  const paymentDetails = {
    month: payment?.month,
    year: payment?.year,
    deposit: payment?.deposit,
    amount: payment?.price_total,
    name: payment?.name,
    state: payment?.state,
    date: payment?.date,
    product_id: payment?.product_id,
    display_name: payment?.display_name,
    user_id: payment?.user_id,
    currency_sybol: payment?.currency_sybol,
    tax_ids: payment?.tax_ids,
    price_subtotal: payment?.price_subtotal,
  };

  useEffect(() => {
    if (itemId !== null && payment?.id === itemId) {
      handlePress(paymentDetails);
    }
  }, [itemId, payment?.id, handlePress]);

  return (
    <Box borderRadius={10} overflow={"hidden"}>
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
        <VStack w={"100%"}>
          <HStack w={"100%"}>
            <Box w={"65%"}>
              <Text
                color={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black
                }
                fontSize="lg"
                fontWeight="bold"
              >
                {`${payment?.month} ${payment?.year}`}
              </Text>
              <Text
                fontSize={"md"}
                color={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black
                }
              >
                {`${payment?.name} : ${payment?.amount} ${payment?.currency_sybol}`}
              </Text>
            </Box>
            <Box
              alignItems={"flex-end"}
              w={"35%"}
              h={"100%"}
              mx={"auto"}
              mt={5}
            >
              <Box
                mt={2}
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
          <HStack>
            <Pressable
              onPress={() => {
                handlePress(paymentDetails);
              }}
            >
              <Text color={MA_REUSSITE_CUSTOM_COLORS.LightTextCalendarCard}>
                Détails du paiement...
                <Text underline={true} fontWeight="500" color="blue.500">
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
