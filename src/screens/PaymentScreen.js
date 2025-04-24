// import { MaterialIcons } from "@expo/vector-icons";
// import {
//   Actionsheet,
//   Box,
//   Center,
//   Divider,
//   HamburgerIcon,
//   HStack,
//   Icon,
//   IconButton,
//   Menu,
//   Pressable,
//   ScrollView,
//   Spinner,
//   Text,
//   useDisclose,
//   VStack,
// } from "native-base";
// import React, { useState, useEffect } from "react";
// import { BackgroundWrapper, PaymentCard, PaymentCardPlus } from "../components";
// import { useThemeContext } from "../hooks/ThemeContext";
// import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

// // Tableau des paiements
// const payments = [
//   {
//     date: "10/01/2024",
//     month: "Janvier",
//     year: "2024",
//     name: "Frais de scolarité",
//     product_id: 101,
//     price_subtotal: 300,
//     price_total: 350,
//     deposit: 350,
//     display_name: "Paiement Scolarité Janvier",
//     payment_state: "paid",
//     partner_id: 1,
//     currency_sybol: "€",
//     tax_ids: [1],
//   },
//   {
//     date: "10/02/2024",
//     month: "Février",
//     year: "2024",
//     name: "Frais de scolarité",
//     product_id: 102,
//     price_subtotal: 300,
//     price_total: 350,
//     deposit: 350,
//     display_name: "Paiement Scolarité Février",
//     payment_state: "paid",
//     partner_id: 1,
//     currency_sybol: "€",
//     tax_ids: [1],
//   },
//   {
//     date: "10/03/2024",
//     month: "Mars",
//     year: "2024",
//     name: "Frais de scolarité",
//     product_id: 103,
//     price_subtotal: 300,
//     price_total: 350,
//     deposit: 350,
//     display_name: "Paiement Scolarité Mars",
//     payment_state: "paid",
//     partner_id: 1,
//     currency_sybol: "€",
//     tax_ids: [1],
//   },
//   {
//     date: "10/04/2024",
//     month: "Avril",
//     year: "2024",
//     name: "Frais de scolarité",
//     product_id: 104,
//     price_subtotal: 300,
//     price_total: 350,
//     deposit: 200,
//     display_name: "Paiement Scolarité Avril",
//     payment_state: "not_paid",
//     partner_id: 1,
//     currency_sybol: "€",
//     tax_ids: [1],
//   },
//   {
//     date: "10/05/2024",
//     month: "Mai",
//     year: "2024",
//     name: "Frais de scolarité",
//     product_id: 105,
//     price_subtotal: 300,
//     price_total: 350,
//     deposit: 0,
//     display_name: "Paiement Scolarité Mai",
//     payment_state: "not_paid",
//     partner_id: 1,
//     currency_sybol: "€",
//     tax_ids: [1],
//   },
// ];

// const PaymentScreen = () => {
//   const { isOpen, onOpen, onClose } = useDisclose();
//   const [sortOrder, setSortOrder] = useState("recent");
//   const [sortedPayments, setSortedPayments] = useState(payments);
//   const [loading, setLoading] = useState(false);
//   const [paymentDetails, setPaymentDetails] = useState({});
//   const { isDarkMode } = useThemeContext();

//   const compareDates = (a, b) => {
//     const months = {
//       Janvier: 0,
//       Février: 1,
//       Mars: 2,
//       Avril: 3,
//       Mai: 4,
//       Juin: 5,
//       Juillet: 6,
//       Août: 7,
//       Septembre: 8,
//       Octobre: 9,
//       Novembre: 10,
//       Décembre: 11,
//     };

//     const [monthA, yearA] = a.date.split("/");
//     const [monthB, yearB] = b.date.split("/");

//     const dateA = new Date(yearA, monthA);
//     const dateB = new Date(yearB, monthB);

//     return sortOrder === "recent" ? dateB - dateA : dateA - dateB;
//   };

//   useEffect(() => {
//     const sorted = [...payments].sort(compareDates);
//     setSortedPayments(sorted);
//   }, [sortOrder]);

//   const handlePress = (paymentDetails) => {
//     setPaymentDetails(paymentDetails);
//     onOpen();
//   };

//   return (
//     <Box flex={1} bg="white">
//       <BackgroundWrapper navigation={navigation}>
//         <HStack
//           justifyContent="space-between"
//           alignItems="center"
//           mt={4}
//           mb={4}
//           mx={"auto"}
//           w={"80%"}
//         >
//           <Text
//             textAlign={"center"}
//             color={
//               isDarkMode
//                 ? MA_REUSSITE_CUSTOM_COLORS.White
//                 : MA_REUSSITE_CUSTOM_COLORS.Black
//             }
//             fontSize="lg"
//             fontWeight="bold"
//           >
//             Historique de paiements
//           </Text>

//           <Menu
//             mr={5}
//             borderWidth={1}
//             borderColor={
//               isDarkMode
//                 ? MA_REUSSITE_CUSTOM_COLORS.DarkDivider
//                 : MA_REUSSITE_CUSTOM_COLORS.LightDivider
//             }
//             bg={
//               isDarkMode
//                 ? MA_REUSSITE_CUSTOM_COLORS.Black
//                 : MA_REUSSITE_CUSTOM_COLORS.White
//             }
//             trigger={(triggerProps) => {
//               return (
//                 <Pressable
//                   accessibilityLabel="More options menu"
//                   {...triggerProps}
//                 >
//                   <Box
//                     bg={
//                       isDarkMode
//                         ? MA_REUSSITE_CUSTOM_COLORS.Black
//                         : MA_REUSSITE_CUSTOM_COLORS.White
//                     }
//                     borderWidth={1}
//                     borderColor={
//                       isDarkMode
//                         ? MA_REUSSITE_CUSTOM_COLORS.DarkDivider
//                         : MA_REUSSITE_CUSTOM_COLORS.LightDivider
//                     }
//                     shadow={1}
//                     borderRadius={"lg"}
//                   >
//                     <Icon
//                       as={MaterialIcons}
//                       name="filter-alt"
//                       size="4xl"
//                       color={
//                         isDarkMode
//                           ? MA_REUSSITE_CUSTOM_COLORS.White
//                           : MA_REUSSITE_CUSTOM_COLORS.Black
//                       }
//                     />
//                   </Box>
//                 </Pressable>
//               );
//             }}
//           >
//             <Menu.Item
//               _text={{
//                 color: isDarkMode
//                   ? MA_REUSSITE_CUSTOM_COLORS.White
//                   : MA_REUSSITE_CUSTOM_COLORS.Black,
//               }}
//               onPress={() => setSortOrder("oldest")}
//             >
//               Plus anciens {`${sortOrder === "oldest" ? "✓" : ""}`}
//             </Menu.Item>
//             <Divider />
//             <Menu.Item
//               _text={{
//                 color: isDarkMode
//                   ? MA_REUSSITE_CUSTOM_COLORS.White
//                   : MA_REUSSITE_CUSTOM_COLORS.Black,
//               }}
//               onPress={() => setSortOrder("recent")}
//             >
//               Plus récents {`${sortOrder === "recent" ? "✓" : ""}`}
//             </Menu.Item>
//           </Menu>
//         </HStack>
//         {loading ? (
//           <Center h={"70%"} w={"90%"} mx={"auto"}>
//             <Spinner size="xl" />
//           </Center>
//         ) : (
//           <ScrollView
//             flex={1}
//             flexGrow={1}
//             w={"90%"}
//             mx={"auto"}
//             mb={"10%"}
//             contentContainerStyle={{ paddingBottom: 120 }}
//           >
//             <VStack w={"full"} mb={"1/6"} space={4} minH={"80%"}>
//               {sortedPayments?.length > 0 ? (
//                 sortedPayments?.map((payment, index) => (
//                   <PaymentCard
//                     isDarkMode={isDarkMode}
//                     key={index}
//                     date={payment.date}
//                     month={payment.month}
//                     year={payment.year}
//                     name={payment.name}
//                     product_id={payment.product_id}
//                     price_subtotal={payment.price_subtotal}
//                     deposit={payment.deposit}
//                     display_name={payment.display_name}
//                     amount={payment.price_total}
//                     state={payment.payment_state}
//                     user_id={payment.partner_id}
//                     currency_sybol={payment.currency_sybol}
//                     tax_ids={payment.tax_ids}
//                     handlePress={handlePress}
//                     onOpen={onOpen}
//                   />
//                 ))
//               ) : (
//                 <Box>
//                   <Text
//                     mt={"30%"}
//                     color={MA_REUSSITE_CUSTOM_COLORS.Black}
//                     textAlign={"center"}
//                     fontSize={"2xl"}
//                     fontWeight={"bold"}
//                   >
//                     Pas de paiement
//                   </Text>
//                 </Box>
//               )}
//             </VStack>
//           </ScrollView>
//         )}

//         <Actionsheet
//           isOpen={isOpen}
//           onClose={() => {
//             onClose();
//           }}
//         >
//           <Actionsheet.Content
//             bg={
//               isDarkMode
//                 ? MA_REUSSITE_CUSTOM_COLORS.BackgroundDark
//                 : MA_REUSSITE_CUSTOM_COLORS.White
//             }
//           >
//             <Box w="100%" h={60} px={4} justifyContent="center">
//               <Text
//                 textAlign={"center"}
//                 color={
//                   isDarkMode
//                     ? MA_REUSSITE_CUSTOM_COLORS.White
//                     : MA_REUSSITE_CUSTOM_COLORS.Black
//                 }
//                 fontSize="xl"
//                 fontWeight="bold"
//               >
//                 Récapitulatif
//               </Text>
//             </Box>
//             {paymentDetails.name !== undefined && (
//               <PaymentCardPlus
//                 isDarkMode={isDarkMode}
//                 paymentDetails={paymentDetails}
//               />
//             )}
//           </Actionsheet.Content>
//         </Actionsheet>
//       </BackgroundWrapper>
//     </Box>
//   );
// };

// export default PaymentScreen;
import { MaterialIcons } from "@expo/vector-icons";
import {
  Actionsheet,
  Box,
  Center,
  Divider,
  HStack,
  Icon,
  Menu,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  useDisclose,
  VStack,
} from "native-base";
import React, { useState, useEffect } from "react";
import { BackgroundWrapper, PaymentCard, PaymentCardPlus } from "../components";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { browse } from "../../http/http";
import { getUserInfo } from "../utils/AuthService";
import { useAuth } from "../utils/AuthContext";
import { ActivityIndicator } from "react-native";

const PaymentScreen = () => {
  const navigation = useAuth();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [sortOrder, setSortOrder] = useState("recent");
  const [sortedPayments, setSortedPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState({});
  const { isDarkMode } = useThemeContext();

  // Compare payment dates for sorting
  const compareDates = (a, b) => {
    if (!a.date || !b.date) {
      return 0;
    }
    const [dayA, monthA, yearA] = a.date.split("/");
    const [dayB, monthB, yearB] = b.date.split("/");
    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);
    return sortOrder === "recent" ? dateB - dateA : dateA - dateB;
  };

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const userId = await getUserInfo();
        if (userId) {
          const paymentsData = await browse(
            "craft.tuition.invoice",
            [
              "due_date",
              "amount",
              "state",
              "order_id",
              "move_id",
              "currency_id",
            ],
            []
          );

          console.log("Payments Data:", paymentsData);

          setSortedPayments(paymentsData.sort(compareDates));
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [sortOrder]);

  const handlePress = (paymentDetails) => {
    setPaymentDetails(paymentDetails);
    onOpen();
  };

  return (
    <Box flex={1} bg="white">
      <BackgroundWrapper navigation={navigation}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt={4}
          mb={4}
          mx="auto"
          w="80%"
        >
          <Text
            textAlign="center"
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
            mr={5}
            borderWidth={1}
            borderColor={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.DarkDivider
                : MA_REUSSITE_CUSTOM_COLORS.LightDivider
            }
            bg={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.Black
                : MA_REUSSITE_CUSTOM_COLORS.White
            }
            trigger={(triggerProps) => (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}
              >
                <Box
                  bg={
                    isDarkMode
                      ? MA_REUSSITE_CUSTOM_COLORS.Black
                      : MA_REUSSITE_CUSTOM_COLORS.White
                  }
                  borderWidth={1}
                  borderColor={
                    isDarkMode
                      ? MA_REUSSITE_CUSTOM_COLORS.DarkDivider
                      : MA_REUSSITE_CUSTOM_COLORS.LightDivider
                  }
                  shadow={1}
                  borderRadius="lg"
                >
                  <Icon
                    as={MaterialIcons}
                    name="filter-alt"
                    size="4xl"
                    color={
                      isDarkMode
                        ? MA_REUSSITE_CUSTOM_COLORS.White
                        : MA_REUSSITE_CUSTOM_COLORS.Black
                    }
                  />
                </Box>
              </Pressable>
            )}
          >
            <Menu.Item
              _text={{
                color: isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black,
              }}
              onPress={() => setSortOrder("oldest")}
            >
              Plus anciens {`${sortOrder === "oldest" ? "✓" : ""}`}
            </Menu.Item>
            <Divider />
            <Menu.Item
              _text={{
                color: isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black,
              }}
              onPress={() => setSortOrder("recent")}
            >
              Plus récents {`${sortOrder === "recent" ? "✓" : ""}`}
            </Menu.Item>
          </Menu>
        </HStack>

        {loading ? (
          <Center h="70%" w="90%" mx="auto">
             <ActivityIndicator size="large" color="#0000ff" />
          </Center>
        ) : (
          <ScrollView
            flex={1}
            flexGrow={1}
            w="90%"
            mx="auto"
            mb="10%"
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            <VStack w="full" mb="1/6" space={4} minH="80%">
              {sortedPayments.length > 0 ? (
                sortedPayments.map((payment, index) => (
                  <PaymentCard
                    isDarkMode={isDarkMode}
                    key={index}
                    date={payment.due_date}
                    state={payment.state}
                    amount={payment.amount}
                    name={payment.order_id[1]}
                    currency_symbol={payment.currency_id[1]}
                    handlePress={handlePress}
                    onOpen={onOpen}
                  />
                ))
              ) : (
                <Box>
                <Center flex={1} mt={10}>
                  <Text
                    color={
                      isDarkMode
                        ? MA_REUSSITE_CUSTOM_COLORS.White
                        : MA_REUSSITE_CUSTOM_COLORS.Black
                    }
                    fontSize={16}
                    fontWeight={"bold"}
                  >
                    Aucun résultat trouvé
                  </Text>
              </Center>
                </Box>
              )}
            </VStack>
          </ScrollView>
        )}

        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content
            bg={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.BackgroundDark
                : MA_REUSSITE_CUSTOM_COLORS.White
            }
          >
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text
                textAlign="center"
                color={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black
                }
                fontSize="xl"
                fontWeight="bold"
              >
                Récapitulatif
              </Text>
            </Box>
            {paymentDetails.name !== undefined && (
              <PaymentCardPlus
                isDarkMode={isDarkMode}
                paymentDetails={paymentDetails}
              />
            )}
          </Actionsheet.Content>
        </Actionsheet>
      </BackgroundWrapper>
    </Box>
  );
};

export default PaymentScreen;
