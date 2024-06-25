import React from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { View } from "react-native";
import MA_REUSSITE_CUSTOM_COLORS from "../../themes/variables";
import CalendarLocalConfig from "../../utils/CalendarLocalConfig";
import { Box } from "native-base";

// LocaleConfig.defaultLocale = "fr";

CalendarLocalConfig;

const Payement = () => {
  return (
    <View style={{ flex: 1, marginTop: "20%" }}>
      <Box
        mx={"auto"}
        width={"90%"}
        borderRadius={10}
        borderColor={"danger"}
        // borderWidth={2}
        shadow={"9"}
        overflow={"hidden"}
      >
        <Calendar
          // current={"2024-05-16"}
          // minDate={"2024-05-10"}
          // maxDate={"2024-06-30"}
          onDayPress={(day) => {
            console.log("selected day", day);
          }}
          monthFormat={"MMMM yyyy"}
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
          hideArrows={false}
          disableMonthChange={false}
          firstDay={1}
          markedDates={{
            "2024-05-16": {
              selected: true,
              marked: true,
              selectedColor: "blue",
            },
            "2024-05-17": { marked: true },
            "2024-05-18": { marked: true, dotColor: "red", activeOpacity: 0 },
            "2024-05-19": { disabled: true, disableTouchEvent: true },
          }}
          theme={{
            selectedDayBackgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
            todayTextColor: "white",
            todayBackgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
            arrowColor: "orange",
            monthTextColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
          }}
        />
      </Box>
    </View>
  );
};

export default Payement;
