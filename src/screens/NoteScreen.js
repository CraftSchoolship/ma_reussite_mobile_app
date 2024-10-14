import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, Center, HStack, Spinner, Text, FlatList } from "native-base";
import React, { useEffect, useState } from "react";
import { BackgroundWrapper, CircularProgress } from "../components";

const fakeNotesData = [
  {
    id: "1",
    evaluation: "Evaluation Big Data",
    score: 18,
    maxScore: 20,
    color: "green.500",
  },
  {
    id: "2",
    evaluation: "Evaluation AWS Cloud",
    score: 16,
    maxScore: 20,
    color: "green.400",
  },
  {
    id: "3",
    evaluation: "Evaluation Java Avancé",
    score: 5,
    maxScore: 20,
    color: "red.400",
  },
  {
    id: "4",
    evaluation: "Evaluation Machine Learning",
    score: 9,
    maxScore: 20,
    color: "orange.400",
  },
  {
    id: "5",
    evaluation: "Evaluation Spring Boot",
    score: 14,
    maxScore: 20,
    color: "green.400",
  },
];

const NoteScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [degrees, setDegrees] = useState("Master 1 Devops");

  return (
    <Box flex={1} bg={"white"}>
      <BackgroundWrapper navigation={navigation}>
        {loading ? (
          <Center h={"70%"} w={"90%"} mx={"auto"}>
            <Spinner size="xl" />
          </Center>
        ) : (
          <>
            <HStack p={4} alignItems={"baseline"}>
              <Text color={"black"} fontSize={18} fontWeight={"bold"}>
                {degrees}
              </Text>
            </HStack>

            <FlatList
              data={fakeNotesData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Box
                  bg={"white"}
                  borderRadius={10}
                  shadow={2}
                  p={4}
                  my={2}
                  mx={4}
                  flexDirection="row"
                  alignItems="center"
                >
                  <CircularProgress
                    progress={item.score}
                    note={true}
                  />
                  <Box ml={4}>
                    <Text fontSize={16} fontWeight={"bold"}>
                      {item.evaluation}
                    </Text>
                  </Box>
                </Box>
              )}
            />
          </>
        )}
      </BackgroundWrapper>
    </Box>
  );
};

export default NoteScreen;

/* -------------------------------------------------------------------------- */
/*                                  VERSION_1                                 */
/* -------------------------------------------------------------------------- */
// import { useNavigation } from "@react-navigation/native";
// import { Box, Center, Image } from "native-base";
// import React from "react";
// import { BackgroundWrapper } from "../components";

// const NoteScreen = () => {
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
//             w={"90%"}
//             resizeMode="contain"
//             minH={"70%"}
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

// export default NoteScreen;
