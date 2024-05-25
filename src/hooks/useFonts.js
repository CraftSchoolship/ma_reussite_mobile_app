import { useState, useEffect } from "react";
import * as Font from "expo-font";

const useFonts = (fontMap) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync(fontMap);
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  return fontsLoaded;
};

export default useFonts;
