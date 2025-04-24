import { Box, Heading, Link, ScrollView, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { useThemeContext } from "../hooks/ThemeContext";
import { getUserInfo } from "../utils/AuthService";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

export const ProfileUserInfo = () => {
  const { isDarkMode } = useThemeContext();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setUser(await getUserInfo());
    };

    fetchUser();
  }, []);

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
            <Link href={"mailto:" + user?.email}>
              <Text
                color={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.Secondary
                    : MA_REUSSITE_CUSTOM_COLORS.Primary
                }
              >
                {user?.email}
              </Text>
            </Link>
          </VStack>
        </Box>
      </Box>
    </ScrollView>
  );
};
