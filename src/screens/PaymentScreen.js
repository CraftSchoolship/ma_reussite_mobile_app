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
import React, { useState } from "react";
import { ImageBackground } from "react-native";
import { HomeScreenBanner } from "../components/Banner";
import { PaymentCard } from "../components/Cards";

const PaymentScreen = () => {
  const [sortOrder, setSortOrder] = useState("recent");

  const payments = [
    { date: "Août 2024", amount: "800", status: false },
    { date: "Juillet 2024", amount: "800", status: false },
    { date: "Juin 2024", amount: "800", status: false },
    { date: "Mai 2024", amount: "800", status: true },
    { date: "Avril 2024", amount: "800", status: true },
    { date: "Mars 2024", amount: "800", status: true },
    { date: "Février 2024", amount: "800", status: true },
    { date: "Janvier 2024", amount: "800", status: true },
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
          <VStack w={"full"} space={4} mt={4}>
            {sortedPayments.map((payment, index) => (
              <PaymentCard
                key={index}
                date={payment.date}
                amount={payment.amount}
                isPayed={payment.status}
              />
            ))}
          </VStack>
        </ScrollView>
      </ImageBackground>
    </Box>
  );
};

export default PaymentScreen;
