import { Box, HStack, Pressable, Text, VStack } from "native-base";
import React from "react";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const PaymentCard = ({
  month,
  year,
  amount,
  name,
  state,
  date,
  product_id,
  display_name,
  user_id,
  currency_sybol,
  handlePress,
  tax_ids,
  price_subtotal,
  occupation = "student",
  deposit,
  isDarkMode,
}) => {
  const statusPayment =
    state !== "not_paid"
      ? { color: MA_REUSSITE_CUSTOM_COLORS.Success, text: "Confirmé" }
      : deposit > 0
      ? { color: MA_REUSSITE_CUSTOM_COLORS.Secondary, text: "En Attente" }
      : { color: MA_REUSSITE_CUSTOM_COLORS.Danger, text: "En Attente" };

  const paymentDetails = {
    month: month,
    year: year,
    deposit: deposit,
    amount: amount,
    name: name,
    state: state,
    date: date,
    product_id: product_id,
    display_name: display_name,
    user_id: user_id,
    currency_sybol: currency_sybol,
    tax_ids: tax_ids,
    price_subtotal: price_subtotal,
  };

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
                {`${month} ${year}`}
              </Text>
              <Text
                fontSize={"md"}
                color={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black
                }
              >
                {`${name} : ${amount} ${currency_sybol}`}
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
                // shadow={1}
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
