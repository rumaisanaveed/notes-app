import { useFonts } from "expo-font";

const useGetFont = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  return fontsLoaded;
};

export default useGetFont;
