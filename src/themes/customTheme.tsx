// theme.js
import { extendTheme } from "native-base";

const customTheme = extendTheme({
  colors: {
    primary: {
      50: "#7f6cfa",
      100: "#624cf3",
      200: "#462de9",
      300: "#361ed1",
      400: "#2d19ae",
      500: "#2b1b94",
      600: "#291c7c",
      700: "#251c65",
      800: "#211a4f",
      900: "#1b163b",
    },
    secondary: {
      50: "#ffdbd7",
      100: "#ffb7af",
      200: "#ff9488",
      300: "#ff7060",
      400: "#ff4e3a",
      500: "#f83c27",
      600: "#f02d18",
      700: "#db2916",
      800: "#bf2b1a",
      900: "#a42b1d",
    },
    tertiary: {
      50: "#67ffcc",
      100: "#43fbbe",
      200: "#23f3ae",
      300: "#13dc99",
      400: "#10b981",
      500: "#139c6e",
      600: "#15835e",
      700: "#166a4e",
      800: "#15543f",
      900: "#133f30",
    },
    danger: {
      50: "#ffd2da",
      100: "#ffaab8",
      200: "#fc8699",
      300: "#f6647c",
      400: "#f43f5e",
      500: "#ec2f4e",
      600: "#e22141",
      700: "#c9223e",
      800: "#af253c",
      900: "#962739",
    },

    // Add more color categories as needed
  },
  fontConfig: {
    Roboto: {
      100: {
        normal: "Roboto-Light",
        italic: "Roboto-LightItalic",
      },
      200: {
        normal: "Roboto-Light",
        italic: "Roboto-LightItalic",
      },
      300: {
        normal: "Roboto-Light",
        italic: "Roboto-LightItalic",
      },
      400: {
        normal: "Roboto-Regular",
        italic: "Roboto-Italic",
      },
      500: {
        normal: "Roboto-Medium",
      },
      600: {
        normal: "Roboto-Medium",
        italic: "Roboto-MediumItalic",
      },
    },
  },
  fonts: {},
  components: {
    Button: {
      baseStyle: {
        rounded: "md",
      },
      defaultProps: {
        colorScheme: "primary",
      },
      variants: {
        solid: () => {
          return {
            bg: "primary.500",
            _hover: {
              bg: "primary.600",
            },
          };
        },
      },
    },
    // Customize other components here
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "dark",
  },
});

export default customTheme;
