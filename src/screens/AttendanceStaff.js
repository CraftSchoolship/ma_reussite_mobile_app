import React, { useState, useEffect } from "react";
import { CameraView, useCameraPermissions } from "expo-camera"; // Removed CameraType
import { MaterialIcons } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  FlatList,
  HStack,
  Icon,
  Pressable,
  Text,
  Image,
} from "native-base";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import HomeScreenBanner from "../components/HomeScreenBanner";
import { useThemeContext } from "../hooks/ThemeContext";
import { TouchableOpacity, StyleSheet } from "react-native";

const participants = [
  { id: "1", name: "Samir Tata (Enseignant)" },
  { id: "2", name: "Mohamed Mohamed" },
  { id: "3", name: "Khalil Galalem" },
  { id: "4", name: "Berthonge Christ" },
  { id: "5", name: "Nagil Glad" },
  { id: "6", name: "Rayen Dhmaied" },
  { id: "7", name: "Asad Babur" },
  { id: "8", name: "Wael Mbarek" },
  { id: "9", name: "Khadija Amri" },
  { id: "10", name: "Ali Zaytoun" },
  { id: "11", name: "Khalil Galalem" },
  { id: "12", name: "Berthonge Christ" },
  { id: "13", name: "Nagil Glad" },
  { id: "14", name: "Rayen Dhmaied" },
  { id: "15", name: "Asad Babur" },
];
const AttendanceStaff = () => {
  // Set all participants to "absent" by default
  const initialAttendance = participants.reduce((acc, participant) => {
    acc[participant.id] = "absent";
    return acc;
  }, {});

  const { isDarkMode } = useThemeContext();
  const [attendance, setAttendance] = useState(initialAttendance);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState("back");

  useEffect(() => {
    if (permission === null) {
      requestPermission();
    }
  }, [permission]);

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const handleBarCodeScanned = ({ data }) => {
    console.log("QR code scanned: ", data);

    // Check if the scanned data corresponds to a participant's ID
    const participant = participants.find((p) => p.id === data);
    if (participant) {
      // Toggle status between "present" and "late"
      setAttendance((prev) => ({
        ...prev,
        [data]: prev[data] === "absent" ? "present" : "late",
      }));
    } else {
      console.log("Invalid QR code");
    }

    closeCamera();
  };

  const toggleCameraType = () => {
    setCameraType((prev) => (prev === "back" ? "front" : "back"));
  };

  const renderParticipant = ({ item }) => (
    <Pressable>
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
      >
        <HStack alignItems={"center"}>
          <Avatar
            size="sm"
            mr={4}
            bgColor={MA_REUSSITE_CUSTOM_COLORS.Secondary}
            ml={4}
          >
            <Icon
              as={MaterialIcons}
              name="person"
              size="lg"
              color="white"
              mx={"auto"}
            />
          </Avatar>
          <Text
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
          >
            {item?.name}
          </Text>
        </HStack>
        <Icon
          as={MaterialIcons}
          name={
            attendance[item.id] === "present"
              ? "check-circle"
              : attendance[item.id] === "absent"
              ? "cancel"
              : "access-time"
          }
          color={
            attendance[item.id] === "present"
              ? "green.500"
              : attendance[item.id] === "absent"
              ? "red.500"
              : "yellow.500"
          }
          size={6}
          mr={4}
        />
      </HStack>
    </Pressable>
  );

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
      <HomeScreenBanner displayGoBackButton={true} previous={"Groups"} />
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
          Master DevOps M2
        </Text>
      </Box>

      <HStack
        bg={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.Black
            : MA_REUSSITE_CUSTOM_COLORS.White
        }
        p={4}
        justifyContent="space-between"
      >
        <Text
          color={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.White
              : MA_REUSSITE_CUSTOM_COLORS.Black
          }
          fontWeight="bold"
          flex={1}
        >
          Participants
        </Text>
        <Text
          color={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.White
              : MA_REUSSITE_CUSTOM_COLORS.Black
          }
          fontWeight="bold"
          textAlign="right"
          flex={0.3}
        >
          Attendance
        </Text>
      </HStack>

      <FlatList
        data={participants}
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
              barcodeTypes: ["qr"],
            }}
            onBarCodeScanned={handleBarCodeScanned}
            type={cameraType}
          >
            <Box style={styles.cameraOverlay}>
              <TouchableOpacity onPress={toggleCameraType}>
                <Text style={styles.switchText}>Switch Camera</Text>
              </TouchableOpacity>
              <Text style={styles.scanText}>Scan QR Code</Text>

              {/* Close Button */}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  cameraOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
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
