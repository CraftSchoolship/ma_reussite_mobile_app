import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Actionsheet,
  Box,
  Center,
  HamburgerIcon,
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
import React, { useState, useEffect } from "react";
import { BackgroundWrapper, PaymentCard, PaymentCardPlus } from "../components";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

// Tableau des paiements
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
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [sortOrder, setSortOrder] = useState("recent");
  const [sortedPayments, setSortedPayments] = useState(payments);
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const { isDarkMode } = useThemeContext();

  // Fonction de tri en fonction de la date
  const compareDates = (a, b) => {
    const months = {
      Janvier: 0,
      Février: 1,
      Mars: 2,
      Avril: 3,
      Mai: 4,
      Juin: 5,
      Juillet: 6,
      Août: 7,
      Septembre: 8,
      Octobre: 9,
      Novembre: 10,
      Décembre: 11,
    };

    const [monthA, yearA] = a.date.split(" ");
    const [monthB, yearB] = b.date.split(" ");

    const dateA = new Date(yearA, months[monthA]);
    const dateB = new Date(yearB, months[monthB]);

    return sortOrder === "recent" ? dateB - dateA : dateA - dateB;
  };

  // Utiliser useEffect pour trier les paiements quand sortOrder change
  useEffect(() => {
    const sorted = [...payments].sort(compareDates);
    setSortedPayments(sorted);
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
            bg={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.White
            }
            trigger={(triggerProps) => {
              return (
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
                    // p={2}
                    // borderWidth={1}
                    // borderColor={"white"}
                    shadow={1}
                    borderRadius={"lg"}
                  >
                    <Icon
                      as={MaterialIcons}
                      name="filter-alt"
                      size="4xl" // Taille de l'icône
                      color={
                        isDarkMode
                          ? MA_REUSSITE_CUSTOM_COLORS.White
                          : MA_REUSSITE_CUSTOM_COLORS.Black
                      } // Couleur de l'icône
                    />
                  </Box>
                </Pressable>
              );
            }}
          >
            <Menu.Item
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              onPress={() => setSortOrder("oldest")}
            >
              Plus anciens
            </Menu.Item>
            <Menu.Item
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              onPress={() => setSortOrder("recent")}
            >
              Plus récents
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
              {sortedPayments?.length > 0 ? (
                sortedPayments?.map((payment, index) => (
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
          <Actionsheet.Content
            bg={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.BackgroundDark
                : MA_REUSSITE_CUSTOM_COLORS.White
            }
          >
            <Box w="100%" h={60} px={4} justifyContent="center">
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
                Détails du fiche de paie
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

// 
// la semaine passée on a eu une reunion Berthone et moi, il a validé la screen note
// pour la screen activity il y un bouton à ajouter parce qu'on attendait que Glad 
// nous dise à quoi cà servait. 
// pour les taches à faire, je devais finir le payment screen aujourd'hui. je viens de 
// finir et de le pousser. 