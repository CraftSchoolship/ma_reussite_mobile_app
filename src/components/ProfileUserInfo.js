import { Box, Heading, Link, ScrollView, Text, VStack } from "native-base";
import React from "react";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

export const ProfileUserInfo = ({ isDarkMode, connectedUser }) => {
  return (
    <ScrollView
      mt={2}
      space={2}
      h={"full"}
      w={"full"}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <Box mt={4}>
        <Heading
          mx={4}
          color={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.White
              : MA_REUSSITE_CUSTOM_COLORS.Black
          }
          size="md"
        >
          Contact
        </Heading>
        <Box h={"full"} justifyContent={"space-between"}>
          <VStack mx={4}>
            <Text
              mt={2}
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              bold
            >
              Adresse email :
            </Text>
            <Link href={connectedUser && connectedUser.email}>
              <Text
                color={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.Secondary
                    : MA_REUSSITE_CUSTOM_COLORS.Primary
                }
              >
                {connectedUser && connectedUser.email}
              </Text>
            </Link>
          </VStack>
        </Box>
      </Box>
    </ScrollView>
  );
};
