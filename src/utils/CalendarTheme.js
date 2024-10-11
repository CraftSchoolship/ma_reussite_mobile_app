import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const CalendarTheme = (isDarkMode) => ({
  selectedDayBackgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
  todayTextColor: MA_REUSSITE_CUSTOM_COLORS.White,
  todayBackgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
  arrowColor: isDarkMode
    ? MA_REUSSITE_CUSTOM_COLORS.White
    : MA_REUSSITE_CUSTOM_COLORS.Primary,
  monthTextColor: isDarkMode
    ? MA_REUSSITE_CUSTOM_COLORS.White
    : MA_REUSSITE_CUSTOM_COLORS.Primary,
  calendarBackground: isDarkMode
    ? MA_REUSSITE_CUSTOM_COLORS.Black
    : MA_REUSSITE_CUSTOM_COLORS.White,
  dayTextColor: isDarkMode
    ? MA_REUSSITE_CUSTOM_COLORS.White
    : MA_REUSSITE_CUSTOM_COLORS.Black,
  textDisabledColor: isDarkMode
    ? MA_REUSSITE_CUSTOM_COLORS.InactiveColorDark
    : MA_REUSSITE_CUSTOM_COLORS.InactiveColorLight,
  textDayFontColor: isDarkMode
    ? MA_REUSSITE_CUSTOM_COLORS.White
    : MA_REUSSITE_CUSTOM_COLORS.Black,
});

export default CalendarTheme;
