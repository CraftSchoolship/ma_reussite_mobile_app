import { Pressable, Text } from "native-base";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

export const TabMenuItem = ({
  isDarkMode,
  title,
  tabKey,
  activeTab,
  setActiveTab,
}) => {
  return (
    <Pressable onPress={() => setActiveTab(tabKey)}>
      <Text
        borderBottomWidth={activeTab === tabKey ? 3 : 0}
        borderBottomColor={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.Secondary
            : MA_REUSSITE_CUSTOM_COLORS.Primary
        }
        color={
          activeTab !== tabKey
            ? MA_REUSSITE_CUSTOM_COLORS.InactiveColorDark
            : isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.White
            : MA_REUSSITE_CUSTOM_COLORS.Black
        }
        pb={1}
      >
        {title}
      </Text>
    </Pressable>
  );
};
