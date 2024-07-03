import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Menu,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import { HomeScreenBanner, PaymentCard } from "../components";
import { useRoute } from "@react-navigation/native";

const PaymentScreen = () => {
  const [sortOrder, setSortOrder] = useState("recent");
  const route = useRoute();
  const { sessionId, email, password } = route.params;

  useEffect(() => {
    console.log(
      "sessionId =",
      sessionId,
      ", email =",
      email,
      ", password =",
      password
    );
  }, [route]);

  const payments = [
    { date: "Août 2024", amount: "800", isPaid: false },
    { date: "Juillet 2024", amount: "800", isPaid: false },
    { date: "Juin 2024", amount: "800", isPaid: false },
    { date: "Mai 2024", amount: "800", isPaid: true },
    { date: "Avril 2024", amount: "800", isPaid: true },
    { date: "Mars 2024", amount: "800", isPaid: true },
    { date: "Février 2024", amount: "800", isPaid: true },
    { date: "Janvier 2024", amount: "800", isPaid: true },
  ];

  const sortedPayments = payments.sort((a, b) => {
    if (sortOrder === "recent") {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  return (
    <Box flex={1} bg="white">
      <HomeScreenBanner />
      <ImageBackground
        style={{ resizeMode: "contain" }}
        source={require("../../assets/images/ma_reussite_background.png")}
      >
        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt={4}
          mb={4}
          mx={"auto"}
          w={"80%"}
        >
          <Text
            textAlign={"center"}
            color={"black"}
            fontSize="lg"
            fontWeight="bold"
          >
            Historique de paiements
          </Text>
          <Menu
            trigger={(triggerProps) => {
              return (
                <Pressable {...triggerProps}>
                  <IconButton
                    icon={<Icon as={MaterialIcons} name="filter-alt" />}
                    borderRadius="lg"
                    bg={"white"}
                    _icon={{
                      color: "black",
                      size: "lg",
                    }}
                    _pressed={{
                      bg: "coolGray.800:alpha.20",
                      _icon: {
                        name: "filter-alt",
                      },
                      _ios: {
                        _icon: {
                          size: "2xl",
                        },
                      },
                    }}
                  />
                </Pressable>
              );
            }}
          >
            <Menu.Item color={"black"} onPress={() => setSortOrder("recent")}>
              Plus récents
            </Menu.Item>
            <Menu.Item color={"black"} onPress={() => setSortOrder("oldest")}>
              Plus anciens
            </Menu.Item>
          </Menu>
        </HStack>

        <ScrollView
          flexGrow={1}
          h={"80%"}
          w={"90%"}
          mx={"auto"}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <VStack w={"full"} mb={"10%"} space={4}>
            {sortedPayments.map((payment, index) => (
              <PaymentCard
                key={index}
                date={payment.date}
                amount={payment.amount}
                isPayed={payment.isPaid}
              />
            ))}
          </VStack>
        </ScrollView>
      </ImageBackground>
    </Box>
  );
};

export default PaymentScreen;
