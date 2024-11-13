import React, { useState, useEffect } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  FlatList,
  HStack,
  Icon,
  Pressable,
  Text,
  Image,
  Button,
  VStack,
  useToast,
} from "native-base";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import HomeScreenBanner from "../components/HomeScreenBanner";
import { useThemeContext } from "../hooks/ThemeContext";
import { TouchableOpacity, StyleSheet, Vibration, Alert, Modal, View } from "react-native";
import { browse, execute, update } from "../../http/http";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { ToastAlert } from "../components";

const AttendanceStaff = () => {
  const route = useRoute();
  const session = route?.params?.session;
  const { isDarkMode } = useThemeContext();
  const [attendance, setAttendance] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [manualEditAttendance, setManualEditAttendance] = useState(0);
  const toast = useToast();

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused)
      setAttendance(null);
  },[isFocused]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const students = await browse(
        "craft.attendance.line",
        ["student_id", "present", "late", "absent", "excused"],
        [["session_id", "=", session.id]]
      );
      setAttendance(students);
    };

    if (!attendance) fetchAttendance();
  }, [attendance]);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission]);

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const submit_attendance = async (barcode) => {
    try {
      await execute("craft.attendance.line", "create_from_barcode", [
        {
          session_id: session.id,
          barcode: barcode,
        },
      ]);
      setAttendance(null);

      toast.show({
        render: () => (
          <ToastAlert
            title={"Succès"}
            description={"Présence mise à jour avec succès"}
            status={"success"}
            isClosable={true}
            variant={"left-accent"}
            duration={5000}
          />
        ),
      });
    } catch (error) {
      let message = error.data.arguments[0];
      toast.show({
        render: () => (
          <ToastAlert
            title={"Erreur"}
            description={message}
            status={"danger"}
            isClosable={true}
            variant={"left-accent"}
            duration={5000}
          />
        ),
      });
      console.error("Error saving attendance:", message);
    }
  };

  const update_attendance = async (attendance_id, status) => {
    try {
      await update('craft.attendance.line', attendance_id, {
        present: status == 'present',
        late: status == 'late',
        absent: status == 'absent',
        excused: status == 'excused'
      });
      setAttendance(null);

      toast.show({
        render: () => (
          <ToastAlert
            title={"Succès"}
            description={"Présence mise à jour avec succès"}
            status={"success"}
            isClosable={true}
            variant={"left-accent"}
            duration={5000}
          />
        ),
      });
    } catch (error) {
      let message = error.data.arguments[0];
      toast.show({
        render: () => (
          <ToastAlert
            title={"Erreur"}
            description={message}
            status={"danger"}
            isClosable={true}
            variant={"left-accent"}
            duration={5000}
          />
        ),
      });
      console.error("Error saving attendance:", message);
    }
  };

  const handleBarCodeScanned = (event) => {
    const barcode = event?.data;
    if (!barcode) return;
    console.log("QR code scanned: ", barcode);

    Vibration.vibrate(100);

    if (/^(\d{17})$/.test(barcode)) {
      let student_id = parseInt(
        barcode
          .split("")
          .filter((_, index) => index % 2 === 0)
          .join("")
      );
      if (attendance.map((item) => item.student_id[0]).includes(student_id))
        submit_attendance(barcode);
      else
        Alert.alert(
          "Étudiant Inconnue",
          "Vous avez scanné l'identifiant d'un élève qui n'est pas inscrit dans ce groupe. Voulez-vous continuer ?",
          [
            {
              text: "Annuler",
              onPress: () => console.log("Canceled Scan"),
              style: "cancel",
            },
            { text: "Continuer", onPress: () => submit_attendance(barcode) },
          ]
        );
    } else console.log("Unknown Student ID");

    closeCamera();
  };

  const toggleCameraType = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const renderParticipant = ({ item }) => {

    return (
      <Pressable onPress={() => setManualEditAttendance(item.id)}>
        <HStack
          bg={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.DarkBackground
              : MA_REUSSITE_CUSTOM_COLORS.White
          }
          borderColor={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.DarkDivider
              : MA_REUSSITE_CUSTOM_COLORS.LightDivider
          }
          p={4}
          shadow={4}
          borderWidth={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack alignItems="center">
            <Avatar
              size="sm"
              mr={4}
              bgColor={MA_REUSSITE_CUSTOM_COLORS.Secondary}
              ml={4}
            >
              <Icon as={MaterialIcons} name="person" size="lg" color="white" />
            </Avatar>
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
            >
              {item?.student_id[1]}
            </Text>
          </HStack>

          <Pressable onPress={() => setManualEditAttendance(item.id)}>
            <Icon
              as={FontAwesome}
              name={
                item.present
                  ? "check-circle"
                  : item.excused
                  ? "times-circle"
                  : item.late
                  ? "clock-o"
                  : "exclamation-circle"
              }
              color={
                item.present
                  ? "green.500"
                  : item.excused
                  ? "red.500"
                  : item.late
                  ? "orange.500"
                  : "pink.500"
              }
              size={6}
              mr={4}
            />
            <Modal transparent={true} animationType="fade" visible={manualEditAttendance == item.id}>
              <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                onPress={() => setManualEditAttendance(0)}
              >
                <View style={{ width: 280, padding: 20, backgroundColor: 'white', borderRadius: 8 }}>
                  <VStack width={"full"}>
                    <Text
                      color={
                        isDarkMode
                          ? MA_REUSSITE_CUSTOM_COLORS.White
                          : MA_REUSSITE_CUSTOM_COLORS.Black
                      }
                      mb={4}
                      fontWeight={'bold'}
                      fontSize={'lg'}
                    >
                      Marquer {item.student_id[1]}
                    </Text>
                    <FlatList
                      data={['present', 'late', 'excused', 'absent']}
                      renderItem={renderAttendanceMenu}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{ paddingBottom: 2 }}
                    />
                  </VStack>
                </View>
              </TouchableOpacity>
            </Modal>
          </Pressable>
        </HStack>
      </Pressable>
    );
  };

  const renderAttendanceMenu = ({ item }) => {
    const status = item

    return (
      <Pressable onPress={() => {update_attendance(manualEditAttendance, status); setManualEditAttendance(0)}}>
        <HStack
          bg={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.DarkBackground
              : MA_REUSSITE_CUSTOM_COLORS.White
          }
          borderColor={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.DarkDivider
              : MA_REUSSITE_CUSTOM_COLORS.LightDivider
          }
          p={4}
          shadow={4}
          borderWidth={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack alignItems="center">

          <Icon
              as={FontAwesome}
              name={
                status === "present"
                  ? "check-circle"
                  : status === "excused"
                  ? "times-circle"
                  : status === "late"
                  ? "clock-o"
                  : "exclamation-circle"
              }
              color={
                status === "present"
                  ? "green.500"
                  : status === "excused"
                  ? "red.500"
                  : status === "late"
                  ? "orange.500"
                  : "pink.500"
              }
              size={6}
              mr={4}
            />
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
            >
              {
                status === "present"
                  ? "Present(e)"
                  : status === "absent"
                  ? "Absent(e)"
                  : status === "late"
                  ? "En Retard"
                  : "Excusé(e)"}
            </Text>
          </HStack>
        </HStack>
      </Pressable>
    );
  };

  return (
    <Box
      minH={"full"}
      bg={
        isDarkMode
          ? MA_REUSSITE_CUSTOM_COLORS.Black
          : MA_REUSSITE_CUSTOM_COLORS.White
      }
      pt={8}
      flex={0.9}
    >
      <HomeScreenBanner displayGoBackButton={true} previous={"Home"} />
      <Box pt={2} w={"100%"} paddingBottom={4} zIndex={2}>
        <Text
          color={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.White
              : MA_REUSSITE_CUSTOM_COLORS.Black
          }
          textAlign={"center"}
          fontWeight="bold"
          fontSize="lg"
        >
          {session.class_id[1]}
        </Text>
        <Text
          color={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.White
              : MA_REUSSITE_CUSTOM_COLORS.Black
          }
          textAlign={"center"}
          fontWeight="bold"
          fontSize="lg"
        >
          {session.timing} à {session.classroom_id[1]}
        </Text>
      </Box>

      <FlatList
        data={attendance}
        keyExtractor={(item) => item.id}
        renderItem={renderParticipant}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 2 }}
      />

      <Box
        position="absolute"
        bottom={12}
        right={30}
        alignItems="center"
        bg={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.DarkBackground
            : MA_REUSSITE_CUSTOM_COLORS.LightBackground
        }
      >
        {/* QR Camera Icon */}
        <Pressable onPress={openCamera}>
          <Image
            source={require("../../assets/images/scan.png")}
            style={{ width: 50, height: 50 }}
            alt="Camera Icon"
          />
        </Pressable>
      </Box>

      {isCameraOpen && permission?.granted ? (
        <Box style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            barcodeScannerSettings={{
              barcodeTypes: [
                "aztec",
                "ean13",
                "ean8",
                "qr",
                "pdf417",
                "upc_e",
                "datamatrix",
                "code39",
                "code93",
                "itf14",
                "codabar",
                "code128",
                "upc_a",
              ],
            }}
            onBarcodeScanned={handleBarCodeScanned}
            facing={facing}
          >
            <Box style={styles.cameraOverlay}>
              <TouchableOpacity onPress={toggleCameraType}>
                <Text style={styles.switchText}>Switch Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeCamera}
                style={styles.closeButton}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </Box>
          </CameraView>
        </Box>
      ) : null}
    </Box>
  );
};
const styles = StyleSheet.create({
  cameraContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  cameraOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  switchText: {
    color: "white",
    paddingBottom: 10,
  },
  scanText: {
    color: "white",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    borderRadius: 5,
  },
  closeText: {
    color: "white",
    fontSize: 16,
  },
});

export default AttendanceStaff;
