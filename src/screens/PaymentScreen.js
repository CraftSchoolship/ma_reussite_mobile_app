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
import { jsonrpcRequest } from "../api/apiClient";
import config from "../api/config";

const PaymentScreen = () => {
  const [sortOrder, setSortOrder] = useState("recent");
  const route = useRoute();
  const { sessionId, email, password } = route.params;
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const paymentData = await jsonrpcRequest(
          sessionId,
          password,
          config.model.craftInstallmentLines,
          [[["invoice_id", "=", 38]]],
          ["name", "state", "amount", "due_date", "invoice_id"]
        );
        setPayments(paymentData);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayment();
  }, [sessionId && password]);

  useEffect(() => {
    payments && console.log("Partner...", new Date().getMinutes(), payments);
  }, [payments]);

  const sortedPayments = payments.sort((a, b) => {
    if (sortOrder === "recent") {
      return new Date(b.name) - new Date(a.name);
    } else {
      return new Date(a.name) - new Date(b.name);
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
                name={payment.name}
                amount={payment.amount}
                state={payment.state}
              />
            ))}
          </VStack>
        </ScrollView>
      </ImageBackground>
    </Box>
  );
};

export default PaymentScreen;
