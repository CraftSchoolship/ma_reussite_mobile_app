import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Actionsheet,
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Menu,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  useDisclose,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { getObject, jsonrpcRequest } from "../api/apiClient";
import config from "../api/config";
import { BackgroundWrapper, PaymentCard, PaymentCardPlus } from "../components";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const payments = [
  {
    date: "Janvier 2024",
    name: "Frais de scolarité",
    product_id: 101,
    price_subtotal: 300,
    price_total: 350,
    display_name: "Paiement Scolarité Janvier",
    payment_state: "paid",
    partner_id: 1,
    currency_sybol: "€",
    tax_ids: [1],
  },
  {
    date: "Février 2024",
    name: "Frais de scolarité",
    product_id: 102,
    price_subtotal: 300,
    price_total: 350,
    display_name: "Paiement Scolarité Février",
    payment_state: "paid",
    partner_id: 1,
    currency_sybol: "€",
    tax_ids: [1],
  },
  {
    date: "Mars 2024",
    name: "Frais de scolarité",
    product_id: 103,
    price_subtotal: 300,
    price_total: 350,
    display_name: "Paiement Scolarité Mars",
    payment_state: "paid",
    partner_id: 1,
    currency_sybol: "€",
    tax_ids: [1],
  },
  {
    date: "Avril 2024",
    name: "Frais de scolarité",
    product_id: 104,
    price_subtotal: 300,
    price_total: 350,
    display_name: "Paiement Scolarité Avril",
    payment_state: "not_paid",
    partner_id: 1,
    currency_sybol: "€",
    tax_ids: [1],
  },
  {
    date: "Mai 2024",
    name: "Frais de scolarité",
    product_id: 105,
    price_subtotal: 300,
    price_total: 350,
    display_name: "Paiement Scolarité Mai",
    payment_state: "not_paid",
    partner_id: 1,
    currency_sybol: "€",
    tax_ids: [1],
  },
];

const PaymentScreen = () => {
  // const route = useRoute();
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [sortOrder, setSortOrder] = useState("recent");
  // const [uid, setUid] = useState(null);
  // const [password, setPassword] = useState(null);
  // const [self, setSelfId] = useState(null);
  // const [payments, setPayments] = useState(payments);
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [currencySybol, setCurrencySybol] = useState();
  // const [connectedUser, setConnectedUser] = useState(null);
  const { isDarkMode } = useThemeContext();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const user = await getObject("connectedUser");
  //     setConnectedUser(user);
  //     setLoading(false);
  //   };
  //   fetchUser();
  // }, [route]);

  const handlePress = (paymentDetails) => {
    setPaymentDetails(paymentDetails);
    onOpen();
  };

  // useEffect(() => {
  //   const fetchPayment = async () => {
  //     try {
  //       const paymentState = await jsonrpcRequest(
  //         connectedUser?.uid,
  //         connectedUser?.password,
  //         config.model.accountMove,
  //         [[["partner_id", "=", self]]],
  //         ["name", "payment_state"]
  //       );

  //       const paymentDetails = await jsonrpcRequest(
  //         connectedUser?.uid,
  //         connectedUser?.password,
  //         config.model.accountMoveLine,
  //         [[["partner_id", "=", self]]],
  //         [
  //           "date",
  //           "display_name",
  //           "move_name",
  //           "name",
  //           "partner_id",
  //           "price_subtotal",
  //           "price_total",
  //           "product_id",
  //           "tax_ids",
  //           "currency_id",
  //         ]
  //       );

  //       const currencies = await getObject("currencies");

  //       currencies.forEach((currency) => {
  //         if (currency.id === paymentDetails[0].currency_id[0]) {
  //           setCurrencySybol(currency.symbol);
  //         }
  //       });

  //       const paymentTab = [];
  //       paymentDetails.map((payment) => {
  //         if (payment.product_id) {
  //           paymentState.forEach((state) => {
  //             if (state.name === payment.move_name) {
  //               const data = { ...payment, ...state };
  //               paymentTab.push(data);
  //             }
  //           });
  //         }
  //       });

  //       setPayments(paymentTab);
  //     } catch (error) {
  //       console.error("Error fetching payments:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (connectedUser) {
  //     fetchPayment();
  //   }
  // }, [connectedUser]);

  return (
    <Box flex={1} bg="white">
      <BackgroundWrapper navigation={navigation}>
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
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
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
                    bg={
                      isDarkMode
                        ? MA_REUSSITE_CUSTOM_COLORS.Black
                        : MA_REUSSITE_CUSTOM_COLORS.White
                    }
                    _icon={{
                      color: isDarkMode
                        ? MA_REUSSITE_CUSTOM_COLORS.White
                        : MA_REUSSITE_CUSTOM_COLORS.Black,
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
            <Menu.Item
              color={MA_REUSSITE_CUSTOM_COLORS.Black}
              onPress={() => setSortOrder("recent")}
            >
              Plus récents
            </Menu.Item>
            <Menu.Item
              color={MA_REUSSITE_CUSTOM_COLORS.Black}
              onPress={() => setSortOrder("oldest")}
            >
              Plus anciens
            </Menu.Item>
          </Menu>
        </HStack>
        {loading ? (
          <Center h={"70%"} w={"90%"} mx={"auto"}>
            <Spinner size="xl" />
          </Center>
        ) : (
          <ScrollView
            flexGrow={1}
            h={"80%"}
            w={"90%"}
            mx={"auto"}
            mb={"10%"}
            contentContainerStyle={{ paddingBottom: 80 }}
          >
            <VStack w={"full"} mb={"10%"} space={4} minH={"80%"}>
              {payments?.length > 0 ? (
                payments?.map((payment, index) => (
                  <PaymentCard
                    isDarkMode={isDarkMode}
                    key={index}
                    date={payment.date}
                    name={payment.name}
                    product_id={payment.product_id}
                    price_subtotal={payment.price_subtotal}
                    display_name={payment.display_name}
                    amount={payment.price_total}
                    state={payment.payment_state}
                    user_id={payment.partner_id}
                    // currency_sybol={currencySybol}
                    currency_sybol={payment.currency_sybol}
                    tax_ids={payment.tax_ids}
                    handlePress={handlePress}
                    onOpen={onOpen}
                  />
                ))
              ) : (
                <Box>
                  <Text
                    mt={"30%"}
                    color={MA_REUSSITE_CUSTOM_COLORS.Black}
                    textAlign={"center"}
                    fontSize={"2xl"}
                    fontWeight={"bold"}
                  >
                    Pas de paiement
                  </Text>
                </Box>
              )}
            </VStack>
          </ScrollView>
        )}

        <Actionsheet
          isOpen={isOpen}
          onClose={() => {
            onClose();
          }}
        >
          <Actionsheet.Content bg={"white"}>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text
                textAlign={"center"}
                color={MA_REUSSITE_CUSTOM_COLORS.Black}
                fontSize="lg"
                fontWeight="bold"
              >
                Détails du fiche de paie
              </Text>
            </Box>
            {paymentDetails.name !== undefined && (
              <PaymentCardPlus paymentDetails={paymentDetails} />
            )}
          </Actionsheet.Content>
        </Actionsheet>
      </BackgroundWrapper>
    </Box>
  );
};

export default PaymentScreen;

/* -------------------------------------------------------------------------- */
/*                                  VERSION_1                                 */
/* -------------------------------------------------------------------------- */
// import { useNavigation } from "@react-navigation/native";
// import { Box, Center, Image } from "native-base";
// import React from "react";
// import { BackgroundWrapper } from "../components";

// const PaymentScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <Box flex={1} bg="white">
//       <BackgroundWrapper navigation={navigation}>
//         <Center
//           minH={"80%"}
//           //  bgColor={"amber.400"}
//         >
//           <Image
//             // bgColor={"blue.300"}
//             size="sm"
//             minH={"70%"}
//             w={"90%"}
//             resizeMode="contain"
//             p={2}
//             // m={"auto"}
//             source={require("../../assets/images/coming_soon.png")}
//             alt="Alternate Text"
//           />
//         </Center>
//       </BackgroundWrapper>
//     </Box>
//   );
// };

// export default PaymentScreen;
