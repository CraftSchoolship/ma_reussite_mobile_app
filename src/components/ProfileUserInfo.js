import { Box, Heading, Link, ScrollView, Text, VStack } from "native-base";
import React from "react";

export const ProfileUserInfo = ({connectedUser}) => {
  return (
    <ScrollView
      mt={2}
      space={2}
      h={"full"}
      w={"full"}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <Box mt={4}>
        <Heading mx={4} color={"black"} size="md">
          Contact
        </Heading>
        <Box h={"full"} justifyContent={"space-between"}>
          <VStack mx={4}>
            <Text mt={2} color={"black"} bold>
              Adresse email :
            </Text>
            <Link href={connectedUser && connectedUser.email}>
              <Text color={"primary.500"}>
                {connectedUser && connectedUser.email}
              </Text>
            </Link>
          </VStack>
        </Box>
      </Box>
    </ScrollView>
  );
};
