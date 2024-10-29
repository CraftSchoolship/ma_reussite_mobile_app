import { Box, HStack, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { getObject } from "../api/apiClient";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const PaymentCardPlus = ({
  isDarkMode,
  paymentDetails,
}) => {
  const statusPayment =
    paymentDetails.state !== "not_paid"
      ? { color: MA_REUSSITE_CUSTOM_COLORS.Success, text: "Confirmé" }
      : paymentDetails.deposit > 0
      ? { color: MA_REUSSITE_CUSTOM_COLORS.Secondary, text: "En Attente" }
      : { color: MA_REUSSITE_CUSTOM_COLORS.Danger, text: "En Attente" };

  const [taxName, setTaxName] = useState();

  useEffect(() => {
    const getTaxes = async () => {
      try {
        const taxes = await getObject("taxes");
        taxes.forEach((tax) => {
          if (tax.id === paymentDetails.tax_ids[0]) {
            setTaxName(tax.name);
          }
        });
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };
    if (paymentDetails) getTaxes();
  }, [paymentDetails]);

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
          <VStack w={"100%"}>
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              mb={2}
              fontSize={"md"}
              fontWeight={"bold"}
            >
              {`Mois : ${paymentDetails.month}`}
            </Text>
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              mb={2}
              fontSize={"md"}
              fontWeight={"bold"}
            >
              {`${
                paymentDetails.deposit > 0
                  ? "Date du dernier paiement "
                  : "Dernier delai"
              } : ${paymentDetails.date}`}
            </Text>
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              mb={2}
              fontSize={"md"}
              fontWeight={"bold"}
            >
              {`${paymentDetails.name} : ${paymentDetails.amount} ${paymentDetails.currency_sybol}`}
            </Text>
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              mb={2}
              fontSize={"md"}
              fontWeight={"bold"}
            >
              {`Montant payé : ${paymentDetails.deposit} ${paymentDetails.currency_sybol}`}
            </Text>
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              mb={2}
              fontSize={"md"}
              fontWeight={"bold"}
            >
              {`Montant dû : ${
                paymentDetails.amount - paymentDetails.deposit
              } ${paymentDetails.currency_sybol}`}
            </Text>
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              mb={2}
              fontSize={"md"}
              fontWeight={"bold"}
            >
              Statut :
              <Text color={statusPayment.color}>
                {` ${statusPayment.text}`}
              </Text>
            </Text>

            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              mb={2}
              fontSize={"md"}
              fontWeight={"bold"}
            >
              Description : .....................
            </Text>
          </VStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default PaymentCardPlus;

{
  /*
  Mois : Mai
Dernier delai : 31/05/2024 Date du dernier payement :
Frais de scolarité : 800 €
Montant payé : 0 €
Montant dû : 800€
Statut : En Attente
Description : .....................
  
  */
}
