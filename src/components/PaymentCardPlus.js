import { Box, HStack, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { getObject } from "../api/apiClient";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const PaymentCardPlus = ({
  isDarkMode,
  paymentDetails,
  occupation = "student",
}) => {
  const statusPayment =
    paymentDetails.state !== "not_paid"
      ? { color: "success.600", text: "Payé" }
      : { color: "danger.600", text: "Non Payé" };

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
              fontSize="lg"
              fontWeight="bold"
            >
              {paymentDetails.display_name}
            </Text>
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              mb={2}
            >
              {`Référence : ${paymentDetails.name}`}
            </Text>
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              mb={2}
            >
              {occupation === "student" ? "Etudiant(e) : " : "Professeur(e) : "}
              {/* {paymentDetails.user_id[1]} */}
              {occupation === "student" ? "Etudiant " : "Professeur "}
            </Text>
            
            <Text
              fontSize={"lg"}
              mb={2}
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
            >
              {occupation === "student" ? "Somme TTC : " : "Salaire : "}
              {`${paymentDetails.amount} ${paymentDetails.currency_sybol}`}
            </Text>
            {paymentDetails.state === "not_paid" && (
              <Text
                color={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black
                }
                mb={2}
              >
                {`Date d'échéance : ${paymentDetails.date.split("-")[2]} ${
                  paymentDetails.product_id[1]
                } ${paymentDetails.date.split("-")[0]}`}
              </Text>
            )}
            <Box
              bg={statusPayment.color}
              px={4}
              mr={"auto"}
              py={0.5}
              mb={2}
              rounded="xl"
            >
              <Text color={"white"}>{statusPayment.text}</Text>
            </Box>
          </VStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default PaymentCardPlus;
