import { MaterialIcons } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  Center,
  Heading,
  Icon,
  IconButton,
  Link,
  Text,
  VStack
} from "native-base";
import React from "react";

const ProfileScreen = () => {
  return (
    <Box flex={1} p={4} bg="white">
      <Center>
        <Avatar
          size="2xl"
          source={{
            uri: "https://via.placeholder.com/150",
          }}
        >
          <Avatar.Badge
            bg="white"
            borderWidth={0}
            position="absolute"
            bottom={0}
            right={0}
            size={10}
          >
            <IconButton
              icon={
                <Icon
                  as={MaterialIcons}
                  name="edit"
                  size="lg"
                  color="black"
                  mx={"auto"}
                />
              }
              borderRadius="full"
              _icon={{
                color: "white",
                size: "xs",
              }}
              // _hover={{
              //   bg: "primary.600:alpha.20",
              // }}
              _pressed={{
                bg: "primary.600:alpha.20",
              }}
            />
          </Avatar.Badge>
        </Avatar>
        <Heading color={"black"} mt={2}>
          Mohamed Mohamed
        </Heading>
      </Center>
      <Box mt={4}>
        <Heading color={"black"} size="md">
          Contact
        </Heading>
        <VStack mt={2} space={2}>
          <VStack space={2}>
            <Text mt={3} color={"black"} bold>
              Adresse de courriel
            </Text>
            <Link href="mailto:mohamed.mohamed@ma-reussite.fr">
              <Text color={"primary.500"}>mohamed.mohamed@ma-reussite.fr</Text>
            </Link>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default ProfileScreen;

// import { Center } from 'native-base'
// import React from 'react'
// import { Text, View } from 'react-native'

// const ProfileScreen = () => {
//   return (
//     <Center flex={1}>
//     <View>
//         <Text>ProfileScreen</Text>
//     </View></Center>
//   )
// }

// export default ProfileScreen
