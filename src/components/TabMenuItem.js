import { Pressable, Text } from "native-base";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

export const TabMenuItem = ({ title, tabKey, activeTab, setActiveTab }) => {
  return (
    <Pressable onPress={() => setActiveTab(tabKey)}>
      <Text
        borderBottomWidth={activeTab === tabKey ? 3 : 0}
        borderBottomColor={MA_REUSSITE_CUSTOM_COLORS.Primary}
        color={
          activeTab === tabKey ? MA_REUSSITE_CUSTOM_COLORS.Black : "gray.500"
        }
        pb={1}
      >
        {title}
      </Text>
    </Pressable>
  );
};
