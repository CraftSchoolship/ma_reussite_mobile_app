import React, { useState } from "react";
import { Box, HStack, Icon, Link, Text, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

function PaymentCard({ amount, date, isPayed }) {
  // const [statusPayment, setStatusPayment] = useState();

  const statusPaymentColor = isPayed ? "success.600" : "danger.600";
  const statusPaymentText = isPayed ? "Confirmé" : "En attente";

  return (
    <Box borderRadius={10} overflow={"hidden"}>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        p={4}
      >
        <VStack w={"100%"}>
          <HStack w={"100%"}>
            <Box w={"65%"}>
              <Text color={"black"} fontSize="lg" fontWeight="bold">
                {date}
              </Text>
              <Text fontSize={"md"} color="black">
                Somme : {amount} €
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
                bg={statusPaymentColor}
                px={4}
                py={0.5}
                // shadow={1}
                rounded="xl"
              >
                <Text color={"white"}>{statusPaymentText}</Text>
              </Box>
            </Box>
          </HStack>
          <HStack>
            <Text color="gray.500">Détails du paiement...</Text>
            <Link
              _text={{
                fontWeight: "500",
                color: "blue.500",
              }}
              ml={3}
            >
              Voir plus
            </Link>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}

export default PaymentCard;
