import { Box, HStack, Link, Text, VStack } from "native-base";
import React from "react";

function PaymentCard({ amount, name, state }) {
  const statusPaymentColor = state !== "unpaid" ? "success.600" : "danger.600";
  const statusPaymentText = state !== "unpaid" ? "Confirmé" : "En attente";

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
                {name}
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
